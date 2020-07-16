import { Request, Response } from 'express';
import { getConnection, MoreThanOrEqual, Like } from 'typeorm';

import Poll from 'src/entity/Poll';
import Option from 'src/entity/Option';

export default {
  async index(request: Request, response: Response) {
    const connection = getConnection();

    const { date: dateString, search: searchTerm } = request.query;

    console.log(dateString, searchTerm);

    const date = dateString ? new Date(String(dateString)) : new Date();

    const polls = await connection.manager.find(Poll, {
      relations: ['options', 'options.votes'],
      where: searchTerm
        ? [
            {
              title: Like(`%${searchTerm}%`),
            },
            {
              description: Like(`%${searchTerm}%`),
            },
          ]
        : [],
      take: searchTerm ? 5 : undefined,
    });

    const serializedPolls = polls.map(poll => ({
      ...poll,
      options: undefined,
      votes: poll.options
        .map(option => option.votes.length)
        .reduce((sum, votes) => sum + votes),
    }));

    return response.json(
      serializedPolls.filter(poll => poll.closingDate > date)
    );
  },
  async detail(request: Request, response: Response) {
    const connection = getConnection();

    const { id } = request.params;

    const poll = await connection.manager.findOne(Poll, id, {
      relations: ['options', 'options.votes'],
    });

    if (poll) {
      return response.json({
        ...poll,
        options: poll.options.map(option => ({
          ...option,
          votes: option.votes.length,
        })),
      });
    } else {
      return response.status(404).send("The especified poll doesn't exist.");
    }
  },
  async create(request: Request, response: Response) {
    const connection = getConnection();

    const {
      title,
      description,
      closingDate,
      options: optionsText,
    } = request.body;

    const poll = new Poll();
    poll.title = title;
    poll.description = description;
    poll.closingDate = closingDate;

    const options = optionsText.map(optionText => {
      const option = new Option();
      option.name = optionText;
      option.poll = poll;
      option.votes = [];

      return option;
    });

    poll.options = options;

    await connection.manager.save(poll);
    await connection.manager.save(options);

    return response.status(200).send();
  },
  async delete(request: Request, response: Response) {
    try {
      const connection = getConnection();

      const { id } = request.params;

      const pollsRepository = connection.getRepository(Poll);
      const optionsRepository = connection.getRepository(Option);

      const options = await optionsRepository.find({ where: { poll: id } });
      await Promise.all(
        options.map(option => optionsRepository.delete(option))
      );

      const poll = await pollsRepository.findOne(id);

      if (poll) {
        await pollsRepository.remove(poll);

        return response.status(200).send();
      } else {
        return response.status(404).send();
      }
    } catch (error) {
      console.error(error);
      return response.status(400).send();
    }
  },
};

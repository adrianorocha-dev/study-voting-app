import { Request, Response } from 'express';
import { Connection, getConnection } from 'typeorm';

import Vote from 'src/entity/Vote';
import Option from 'src/entity/Option';

async function getVoteCount(connection: Connection, option: Option) {
  const voteCount = await connection.manager.count(Vote, {
    where: { option },
  });

  return { option: option.name, votes: voteCount };
}

export default {
  async index(request: Request, response: Response) {
    const connection = getConnection();

    const { id: poll_id } = request.params;

    const options = await connection.manager.find(Option, {
      where: { poll: poll_id },
    });

    const pollResult = await Promise.all(
      options.map(option => getVoteCount(connection, option))
    );

    return response.json(pollResult);
  },
  async create(request: Request, response: Response) {
    const connection = getConnection();

    const { option_id } = request.body;

    const option = await connection.manager.findOne(Option, option_id);

    const vote = new Vote();
    vote.option = option;

    await connection.manager.save(vote);

    return response.status(200).send();
  },
};

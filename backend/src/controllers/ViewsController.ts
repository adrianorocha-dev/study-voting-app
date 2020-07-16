import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Poll from 'src/entity/Poll';

export default {
  async create(request: Request, response: Response) {
    const connection = getConnection();
    const { poll_id } = request.body;

    const pollRepository = connection.getRepository(Poll);

    const poll = await pollRepository.findOne(poll_id);

    poll.views += 1;

    await pollRepository.save(poll);

    return response.status(200).send();
  },
};

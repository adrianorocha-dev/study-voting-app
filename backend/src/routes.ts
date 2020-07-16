import { Router } from 'express';
import { createConnection } from 'typeorm';

import PollsController from './controllers/PollsController';
import VotesController from './controllers/VotesController';
import ViewsController from './controllers/ViewsController';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const connection = await createConnection();

    await connection.close();

    return response.json({ message: 'Hello World' });
  } catch (error) {
    console.error(error);
    return response.status(400).send('Error connecting to the database.');
  }
});

routes.get('/polls', PollsController.index);
routes.get('/polls/:id', PollsController.detail);
routes.post('/polls', PollsController.create);
routes.delete('/polls/:id', PollsController.delete);

routes.get('/votes/:id', VotesController.index);
routes.post('/votes', VotesController.create);

routes.post('/views', ViewsController.create);

export default routes;

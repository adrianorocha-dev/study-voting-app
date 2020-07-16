import 'reflect-metadata'; //Required by TypeORM
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

createConnection().then(() => app.listen(3333));

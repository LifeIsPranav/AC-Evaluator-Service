import express, { Express } from 'express';

import { PORT } from './config/serverConfig';
import apiRouter from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('hello');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});

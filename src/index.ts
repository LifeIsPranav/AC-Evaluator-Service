import express, { Express } from 'express';

import serverConfig from './config/server.config';
import apiRouter from './routes';

const app: Express = express();

app.get('/', (_, res) => {
  res.send('hello');
});

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started on http://localhost:${serverConfig.PORT}`);
  console.log('Hi, I am pranav');
});

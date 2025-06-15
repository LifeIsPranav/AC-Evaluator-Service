import express, { Express } from 'express';

import { PORT } from './config/serverConfig';
import apiRouter from './routes';
import bullBoard from './utils/bullBoard';
import sampleWorker from './workers/sampleWorker';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('hello');
});

app.use('/api', apiRouter);
app.use('/admin/queues', bullBoard.bullRouter);
app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
  console.log(`Server at: http://localhost:${PORT}/admin/queues/`);

  sampleWorker('SampleQueue');
});

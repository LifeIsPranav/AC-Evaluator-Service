import express, { Express } from 'express';

import { PORT } from './config/serverConfig';
// import runCpp from './containers/runCpp';
// import sampleQueueProducer from './producers/sampleQueueProducer';
import submissionQueueProducer from './producers/submissionQueueProducer';
// import runJava from './containers/runJavaDocker';
// import runPython from './containers/runPythonDocker';
import apiRouter from './routes';
import bullBoard from './utils/bullBoard';
import { submission_queue } from './utils/constants';
// import sampleWorker from './workers/sampleWorker';
import submissionWorker from './workers/submissionWorker';

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

  // sampleWorker('SampleQueue');

  const code = `
#include <iostream>
using namespace std;

int main(void){
int n;
cin >> n;
cout << n << endl;
cout << endl << endl;

cout << 11111111 << endl;
for(int i = 0; i < 10; i++)
cout << n << endl;
}
`;

const inputCase = '278';

  // runython(code, tc)
  // runJava(code, tc);
  // runCpp(code, tc)

  submissionQueueProducer({
    '1234':{
      language: 'Cpp',
      inputCase,
      code,
    },
  });

  submissionWorker(submission_queue);

});

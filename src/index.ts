import express, { Express } from 'express';

import { PORT } from './config/serverConfig';
import runPython from './containers/runPythonDocker';
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

  const code = `
a = 10
b = 2
print()
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)


# Python program to display the Fibonacci sequence

def recur_fibo(n):
   if n <= 1:
       return n
   else:
       return(recur_fibo(n-1) + recur_fibo(n-2))

nterms = 20

# check if the number of terms is valid
if nterms <= 0:
   print("Plese enter a positive integer")
else:
   print("Fibonacci sequence:")
   for i in range(nterms):
       print(recur_fibo(i))

`;
  runPython(code);
});

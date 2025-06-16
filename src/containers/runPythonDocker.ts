// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { PYTHON_IMG } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';

async function runPython(code: string) {
  
  const rawLogBuffer: Buffer[] = [];

  console.log('Initializing a new Python Docker Container');
  const pythonDockerContainer = await createContainer(PYTHON_IMG, ['python3', '-c', code, 'stty -echo']);
  
  // Starting / Booting the corresponding Container
  await pythonDockerContainer.start();
  console.log('Started Docker Container!');

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // Logs are streamed / returned as a stream
  });

  // Attach Event on the Stream Object to start and stop reading
  let count = 0;
  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
    console.log('Chunk :', ++count);
  });

  loggerStream.on('end', () => {
    console.log(rawLogBuffer);
    // console.log();
    // const output = rawLogBuffer.toString();
    // console.log(output);
    // console.log();
    const completeBuffer = Buffer.concat(rawLogBuffer);
    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);

    if(!decodedStream.stderr)
    console.log(decodedStream.stdout);

    else
    console.log(decodedStream.stderr);
    pythonDockerContainer.remove();

  });

  return pythonDockerContainer;
}

export default runPython;

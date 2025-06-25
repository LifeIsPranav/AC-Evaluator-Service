// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import CodeExecuterStrategy, { ExecutionResponse } from '../types/CodeExecuterStrategy';
import { JAVA_IMG } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';

class JavaExecuter implements CodeExecuterStrategy {
  async execute(code: string, testCase: string, outputCase: string): Promise<ExecutionResponse> {
    
    console.log('Java Executer Called!');
    // console.log(code, testCase, outputCase);
    const rawLogBuffer: Buffer[] = [];

    console.log('Initializing a new Java Docker Container');
    await pullImage(JAVA_IMG);

    const safeCode = code.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const safeTestCase = testCase.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const runCommand = `echo "${safeCode}" > Main.java && javac Main.java && echo "${safeTestCase}" | java Main`;

    // let runCommand = `echo "${code}" > temp.py && echo "${testCase}" | python3 temp.py`;
    // runCommand = runCommand.replace(/'/g, '\'\\"');

    // const pythonDockerContainer = await createContainer(PYTHON_IMG, ['sh', '-c', `echo "${code}" > temp.py && echo "${testCase}" | python3 temp.py`]);
    const JavaDockerContainer = await createContainer(JAVA_IMG, ['sh', '-c', runCommand]);
    
    // Starting / Booting the corresponding Container
    await JavaDockerContainer.start();
    console.log('Started Docker Container!');

    const loggerStream = await JavaDockerContainer.logs({
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

    try {
      const codeResponse: string = await this.fetchDecodedStream(loggerStream, rawLogBuffer);
      return { output: codeResponse, status: 'COMPLETED' };
    } catch (error) {
      return { output: error as string, status: 'ERROR' };
    } finally {
      await JavaDockerContainer.remove();
    }
  }
 
  fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]): Promise<string> {
    return new Promise((res, rej) => {
      loggerStream.on('end', () => {
        console.log(rawLogBuffer);
        // console.log();
        // const output = rawLogBuffer.toString();
        // console.log(output);
        // console.log();
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
    
        // if(!decodedStream.stderr)
        // console.log(decodedStream.stdout);
    
        // else
        // console.log(decodedStream.stderr);

        // res(decodeDockerStream);

        if(decodedStream.stderr) rej(decodedStream.stderr);
        else res(decodedStream.stdout);
      });
    });
  }
  
}

export default JavaExecuter;

import { DockerStreamOutput } from '../types/dockerStramOutput';
import { DOCKER_STREAM_HEADER_SIZE } from '../utils/constants';

function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; // Keeps track of current position in buffer while Parsing

  // Output Object that will store the accumulated stdout and stderr as strings
  const output: DockerStreamOutput = { stdout: '', stderr: '' };

  // Loop until offset reaches end of buffer
  while(offset < buffer.length) {

    // typeOfStream is now read from buffer and has value of type of stream
    const typeOfStream = buffer[offset];

    // Holds length of the value
    // We will read this variable on an offset of 4 bytes from the start of chunk 
    const length = buffer.readUInt32BE(offset + 4);

    // Header Read ✅ -> Move forward to read value of chunk
    offset += DOCKER_STREAM_HEADER_SIZE;

    if(typeOfStream === 1){
      // stdout stream
      output.stdout += buffer.toString('utf-8', offset, offset + length);

    } else if(typeOfStream === 2) {
      // stderr stream
      output.stderr += buffer.toString('utf-8', offset, offset + length);
    }

    offset += length;
  }

  return output;
}

export default decodeDockerStream;

import { Job } from 'bullmq';

import { IJob } from '../types/bullMqJobDefinition';
import { ExecutionResponse } from '../types/CodeExecuterStrategy';
import { SubmissionPayload } from '../types/submissionPayload';
import createExecuter from '../utils/ExecuterFactory';

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle = async (job? : Job) => {
    console.log('Handler of the Submission Job Called');
    console.log(this.payload);
    if(job){
      const key = Object.keys(this.payload)[0];

      const codeLanguage = this.payload[key].language;
      const code = this.payload[key].code;
      const testCase = this.payload[key].inputCase;

      // if(codeLanguage === 'Cpp'){
      //   const response = await runCpp(code, testCase);
      //   console.log('Evaluated Response', response);
      // }

      const strategy = createExecuter(codeLanguage);
      if(strategy != null) {
        const response: ExecutionResponse = await strategy.execute(code, testCase);
        if(response.status === 'COMPLETED') {
          console.log('Code Executed Successfully!');
          console.log(response);
        } else {
          console.log('Something went wrong with code execution');
        }
      }
    }
    
  };

  failed = (job?: Job): void => {
    console.log('Job Failed');
    if(job) console.log(job);
  };

}

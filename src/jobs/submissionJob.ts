import { Job } from 'bullmq';

import runCpp from '../containers/runCpp';
import { IJob } from '../types/bullMqJobDefinition';
import { SubmissionPayload } from '../types/submissionPayload';

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

      const lang = this.payload[key].language;
      const code = this.payload[key].code;
      const testCase = this.payload[key].inputCase;
      if(lang === 'Cpp'){
        const response = await runCpp(code, testCase);
        console.log('Evaluated Response', response);
      }
    }
    
  };

  failed = (job?: Job): void => {
    console.log('Job Failed');
    if(job) console.log(job);
  };

}

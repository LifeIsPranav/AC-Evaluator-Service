import { Job } from 'bullmq';

import { IJob } from '../types/bullMqJobDefinition';

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handle = (job? : Job) => {
    console.log('Handler of the Job Called');
    // console.log(this.name);
    setTimeout(() => {
      console.log(this.payload);
      if(job) console.log('Job Received!', job.data);  //job.name, job.id, job.data
    }, 5000);
    
  };

  failed = (job?: Job): void => {
    console.log('Job Failed');
    if(job) console.log(job);
  };

}

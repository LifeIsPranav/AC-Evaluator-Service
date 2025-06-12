import { Job, Worker } from 'bullmq';

import redisConnection from '../config/redisConfig';
import SampleJob from '../jobs/sampleJob';

export default function sampleWorker(queueName: string) {
  
  new Worker(queueName, async (job: Job) => {
    if(job.name === 'SampleJob'){
      const sampleJobINstance = new SampleJob(job.data);
      sampleJobINstance.handle(job);
    }
  }, { connection: redisConnection });
}

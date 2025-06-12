import { Queue } from 'bullmq';

import redisConnection from '../config/redisConfig';
import bullBoard from '../utils/bullBoard';

const sampleQueue = new Queue('SampleQueue', { connection: redisConnection });
bullBoard.addQtoBull(sampleQueue);
export default sampleQueue;

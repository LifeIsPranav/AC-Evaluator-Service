import { Queue } from 'bullmq';

import redisConnection from '../config/redisConfig';
import bullBoard from '../utils/bullBoard';
import { submission_queue } from '../utils/constants';

const submissionQueue = new Queue(submission_queue, { connection: redisConnection });
bullBoard.addQtoBull(submissionQueue);
export default submissionQueue;

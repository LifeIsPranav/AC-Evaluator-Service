import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

// import submissionQueue from '../queues/submissionQueue';
// import bullBoard from '../utils/bullBoard';

const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
const bullRouter = serverAdapter.getRouter();

const { addQueue, removeQueue } = createBullBoard({
  queues: [],
  serverAdapter: serverAdapter,
});

const addQueueToBullBoard = (queue: Queue) => {
  addQueue(new BullMQAdapter(queue));
};

const removeQueueFromBullBoard = (queueName: string) => {
  removeQueue(queueName);
};

export default {
  addQtoBull: addQueueToBullBoard,
  removeQueue: removeQueueFromBullBoard,
  bullRouter,
};

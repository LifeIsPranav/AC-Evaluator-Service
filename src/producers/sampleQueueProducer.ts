import sampleQueue from '../queues/sampleQueue';

export default async function (name: string, payload: Record<string, unknown>): Promise<void> {
  await sampleQueue.add(name, payload);
  console.log('Successfully added a new job in Sample queue');
};

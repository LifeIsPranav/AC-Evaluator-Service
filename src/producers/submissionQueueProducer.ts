import submissionQueue from '../queues/submissionQueue';

export default async function (payload: Record<string, unknown>): Promise<void> {
  await submissionQueue.add('SubmissionJob', payload);
  console.log('Successfully added a new job in Submission queue');
};

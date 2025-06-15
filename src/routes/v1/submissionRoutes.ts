import express from 'express';

import { addSubmission } from '../../controllers/submissionController';
import { createSubmissionZodSchema } from '../../dtos/createSubmissionDto';
import { validate } from '../../validators/createSubmissionValidator';

const submissionRouter = express.Router();

submissionRouter.post('/', validate(createSubmissionZodSchema), addSubmission);

export default submissionRouter;

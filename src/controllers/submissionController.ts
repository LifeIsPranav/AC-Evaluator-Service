import { Request, Response } from 'express';

import { CreateSubmissionDto } from '../dtos/createSubmissionDto';

export function addSubmission(req: Request, res: Response) {
  const submissionDto = req.body as CreateSubmissionDto;
  console.log(submissionDto);
  // Todo: Add Validation using Zod

  res.status(201).json({
    success: true,
    error: {},
    message: 'Successfully Colleted the Submission',
    data: submissionDto,
  });
}

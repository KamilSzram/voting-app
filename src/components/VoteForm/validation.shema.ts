import * as yup from 'yup';

export const voteValidationSchema = yup.object({
  voterId: yup.number().required(),
  candidateId: yup.number().required(),
});

import * as yup from 'yup';

export const addItemSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must have at least 2 characters')
    .max(15, 'Name must have a maximum of 15 characters')
    .required('Name is required'),
});

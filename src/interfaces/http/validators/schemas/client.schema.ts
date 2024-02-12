import * as yup from 'yup';

export const clientCreateSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  document: yup.string().required(),
  address: yup
    .object({
      street: yup.string().required(),
      number: yup.number().required(),
      complement: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
    })
    .required(),
});

export type IClientCreateSchema = yup.InferType<typeof clientCreateSchema>;

import * as yup from 'yup';

export const invoiceGenerateSchema = yup.object({
  name: yup.string().required(),
  document: yup.string().required(),
  street: yup.string().required(),
  number: yup.number().required(),
  complement: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  items: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        price: yup.number().required(),
      }),
    )
    .min(1)
    .required(),
});

export type IInvoiceGenerateSchema = yup.InferType<
  typeof invoiceGenerateSchema
>;

import * as yup from 'yup';

export const placeOrderSchema = yup.object({
  clientId: yup.string().required(),
  products: yup
    .array()
    .of(
      yup.object({
        productId: yup.string().required(),
      }),
    )
    .min(1)
    .required(),
});

export type IPlaceOrderSchema = yup.InferType<typeof placeOrderSchema>;

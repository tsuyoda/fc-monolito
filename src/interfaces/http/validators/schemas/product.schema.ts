import * as yup from 'yup';

export const productCreateSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  purchasePrice: yup.number().required(),
  stock: yup.number().required(),
});

export type IProductCreateSchema = yup.InferType<typeof productCreateSchema>;

export const addCatalogSchema = yup.object({
  productId: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  salesPrice: yup.number().required(),
});

export type IAddCatalogSchema = yup.InferType<typeof addCatalogSchema>;

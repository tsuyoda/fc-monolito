import * as yup from 'yup';

export default class Validator {
  static validate<T extends yup.Schema>(
    schema: T,
    data: yup.InferType<typeof schema>,
  ) {
    return schema.validate(data, { abortEarly: false });
  }
}

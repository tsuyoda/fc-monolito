import InvoiceRepository from '../../repository/invoice.repository';
import GenerateInvoiceUseCase from './generateInvoice.usecase';
import {
  IGenerateInvoiceUseCaseInputDto,
  IGenerateInvoiceUseCaseOutputDto,
} from './generateInvoice.usecase.dto';

jest.mock('../../repository/invoice.repository');

describe('Generate invoice use case unit tests', () => {
  it('Should generate a invoice', async () => {
    const input: IGenerateInvoiceUseCaseInputDto = {
      name: 'Invoice',
      document: 'Document',
      street: 'Street',
      number: 100,
      complement: 'Complement',
      city: 'City',
      state: 'State',
      zipCode: 'Zip',
      items: [{ id: '1', name: 'Item', price: 100 }],
    };

    const invoiceRepository = new InvoiceRepository();

    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository,
    );

    const results = await generateInvoiceUseCase.execute(input);

    const output: IGenerateInvoiceUseCaseOutputDto = {
      id: expect.any(String),
      name: input.name,
      document: input.document,
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      items: input.items,
      total: 100,
    };

    expect(results).toStrictEqual(output);
  });
});

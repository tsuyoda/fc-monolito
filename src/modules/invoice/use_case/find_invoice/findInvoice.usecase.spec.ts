import Address from '../../../@shared/domain/value_object/address.valueObject';
import Id from '../../../@shared/domain/value_object/id.valueObject';
import Invoice from '../../domain/invoice.entity';
import InvoiceItem from '../../domain/invoiceItems.entity';
import InvoiceRepository from '../../repository/invoice.repository';
import FindInvoiceUseCase from './findInvoice.usecase';
import { IFindInvoiceUseCaseOutputDTO } from './findInvoice.usecase.dto';

jest.mock('../../repository/invoice.repository');

describe('Find invoice use case unit tests', () => {
  it('Should generate a invoice', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Invoice',
      document: 'Document',
      address: new Address(
        'Street',
        'Number',
        'Complement',
        'City',
        'State',
        'Zip',
      ),
      items: [new InvoiceItem({ id: new Id('1'), name: 'Item', price: 100 })],
    });

    const invoiceRepository = new InvoiceRepository();
    const mockedInvoiceFind = jest.mocked(invoiceRepository.find);
    mockedInvoiceFind.mockImplementation(() => Promise.resolve(invoice));

    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    const results = await findInvoiceUseCase.execute({ id: invoice.id.value });

    const output: IFindInvoiceUseCaseOutputDTO = {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: 100,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };

    expect(results).toStrictEqual(output);
  });
});

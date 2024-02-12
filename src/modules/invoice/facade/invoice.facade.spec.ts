import { Sequelize } from 'sequelize-typescript';
import { InvoiceModel } from '../../../infrastructure/database/models/invoice.model';
import { InvoiceItemModel } from '../../../infrastructure/database/models/invoiceItem.model';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import { IGenerateInvoiceFacadeInputDto } from './invoice.facade.interface';
import { v4 as uuid } from 'uuid';

describe('Invoice Facade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should generate a invoice', async () => {
    const facade = InvoiceFacadeFactory.create();

    const input: IGenerateInvoiceFacadeInputDto = {
      name: `Invoice ${uuid()}`,
      document: 'Document',
      address: {
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: 'Zip',
      },
      items: [
        {
          id: '1',
          name: 'Item',
          price: 100,
        },
      ],
    };

    await facade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { name: input.name },
      include: [InvoiceItemModel],
    });

    expect(invoice).toBeDefined();

    expect(invoice!.id).toBeDefined();

    expect(invoice!.name).toBe(input.name);
    expect(invoice!.document).toBe(input.document);
    expect({
      street: invoice!.street,
      number: invoice!.number,
      complement: invoice!.complement,
      city: invoice!.city,
      state: invoice!.state,
      zipCode: invoice!.zipCode,
    }).toStrictEqual(input.address);

    expect(
      invoice!.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
    ).toStrictEqual(input.items);
  });

  it('Should find a invoice', async () => {
    const facade = InvoiceFacadeFactory.create();

    const input: IGenerateInvoiceFacadeInputDto = {
      name: `Invoice ${uuid()}`,
      document: 'Document',
      address: {
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        city: 'City',
        state: 'State',
        zipCode: 'Zip',
      },
      items: [
        {
          id: '1',
          name: 'Item',
          price: 100,
        },
      ],
    };

    await facade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { name: input.name },
    });

    expect(invoice).toBeDefined();

    const searchedInvoice = await facade.find({ id: invoice!.id });

    expect(searchedInvoice.id).toBe(invoice!.id);
    expect(searchedInvoice.name).toBe(input.name);
    expect(searchedInvoice.document).toBe(input.document);

    expect(searchedInvoice.address).toStrictEqual(input.address);

    expect(searchedInvoice.items).toStrictEqual(input.items);

    expect(searchedInvoice.total).toBe(100);

    expect(searchedInvoice.createdAt).toStrictEqual(invoice!.createdAt);
    expect(searchedInvoice.updatedAt).toStrictEqual(invoice!.updatedAt);
  });
});

import { Sequelize } from 'sequelize-typescript';
import { InvoiceModel } from '../../../infrastructure/database/models/invoice.model';
import { InvoiceItemModel } from '../../../infrastructure/database/models/invoiceItem.model';
import Invoice from '../domain/invoice.entity';
import InvoiceItem from '../domain/invoiceItems.entity';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Address from '../../@shared/domain/value_object/address.valueObject';
import InvoiceRepository from './invoice.repository';

describe('Invoice repository tests', () => {
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

  const invoiceRepository = new InvoiceRepository();

  it('Should create a invoice', async () => {
    const item = new InvoiceItem({
      id: new Id('1'),
      name: 'item 1',
      price: 100,
    });
    const address = new Address(
      'Street',
      '1',
      'Complement',
      'City',
      'State',
      'Zip',
    );

    const invoice = new Invoice({
      id: new Id('1'),
      name: 'invoice 1',
      document: 'document x',
      address,
      items: [item],
    });

    await invoiceRepository.add(invoice);

    const modelResults = await InvoiceModel.findOne({
      where: { id: invoice.id.value },
      include: [{ model: InvoiceItemModel, as: 'items' }],
    });

    expect(modelResults.id).toBe(invoice.id.value);
    expect(modelResults.name).toBe(invoice.name);
    expect(modelResults.document).toBe(invoice.document);
    expect(modelResults.street).toBe(address.street);
    expect(modelResults.number).toBe(address.number);
    expect(modelResults.complement).toBe(address.complement);
    expect(modelResults.city).toBe(address.city);
    expect(modelResults.state).toBe(address.state);
    expect(modelResults.zipCode).toBe(address.zipCode);

    const [modelItem] = modelResults.items;

    expect(modelItem.id).toBe(item.id.value);
    expect(modelItem.name).toBe(item.name);
    expect(modelItem.price).toBe(item.price);
  });

  it('Should find a invoice', async () => {
    const item = new InvoiceItem({
      id: new Id('1'),
      name: 'item 1',
      price: 100,
    });
    const address = new Address(
      'Street',
      '1',
      'Complement',
      'City',
      'State',
      'Zip',
    );

    const invoice = new Invoice({
      id: new Id('1'),
      name: 'invoice 1',
      document: 'document x',
      address,
      items: [item],
    });

    await invoiceRepository.add(invoice);

    const searchedInvoice = await invoiceRepository.find(invoice.id.value);

    expect(searchedInvoice.id.value).toBe(invoice.id.value);
    expect(searchedInvoice.name).toBe(invoice.name);
    expect(searchedInvoice.document).toBe(invoice.document);
    expect(searchedInvoice.address.street).toBe(address.street);
    expect(searchedInvoice.address.number).toBe(address.number);
    expect(searchedInvoice.address.complement).toBe(address.complement);
    expect(searchedInvoice.address.city).toBe(address.city);
    expect(searchedInvoice.address.state).toBe(address.state);
    expect(searchedInvoice.address.zipCode).toBe(address.zipCode);

    const [modelItem] = searchedInvoice.items;

    expect(modelItem.id.value).toBe(item.id.value);
    expect(modelItem.name).toBe(item.name);
    expect(modelItem.price).toBe(item.price);
  });
});

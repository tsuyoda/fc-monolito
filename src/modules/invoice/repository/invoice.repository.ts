import Address from '../../@shared/domain/value_object/address.valueObject';
import Id from '../../@shared/domain/value_object/id.valueObject';
import Invoice from '../domain/invoice.entity';
import InvoiceItem from '../domain/invoiceItems.entity';
import IInvoiceGateway from '../gateway/invoice.gateway';
import { InvoiceModel } from './invoice.model';
import { InvoiceItemModel } from './invoiceItem.model';

export default class InvoiceRepository implements IInvoiceGateway {
  async add(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.value,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map(item => ({
          id: item.id.value,
          name: item.name,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [{ model: InvoiceItemModel }] },
    );
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: InvoiceItemModel }],
    });

    if (!invoice) {
      throw new Error(`Can not find invoice with id ${id}`);
    }

    return new Invoice({
      id: new Id(invoice.id),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode,
      ),
      items: invoice.items.map(
        item =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          }),
      ),
    });
  }
}

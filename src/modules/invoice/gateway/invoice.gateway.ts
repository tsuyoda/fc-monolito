import Invoice from '../domain/invoice.entity';

export default interface IInvoiceGateway {
  add(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}

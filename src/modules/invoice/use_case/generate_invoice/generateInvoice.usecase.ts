import Address from '../../../@shared/domain/value_object/address.valueObject';
import Id from '../../../@shared/domain/value_object/id.valueObject';
import Invoice from '../../domain/invoice.entity';
import InvoiceItem from '../../domain/invoiceItems.entity';
import IInvoiceGateway from '../../gateway/invoice.gateway';
import {
  IGenerateInvoiceUseCaseInputDto,
  IGenerateInvoiceUseCaseOutputDto,
} from '../generate_invoice/generateInvoice.usecase.dto';

export default class GenerateInvoiceUseCase {
  constructor(private invoiceRepository: IInvoiceGateway) {}

  async execute(
    input: IGenerateInvoiceUseCaseInputDto,
  ): Promise<IGenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode,
    );
    const items = input.items.map(
      (item: { id: string; name: string; price: number }) =>
        new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        }),
    );

    const invoice = new Invoice({
      id: new Id(),
      name: input.name,
      document: input.document,
      address,
      items,
    });
    await this.invoiceRepository.add(invoice);

    return {
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
      total: invoice.total,
    };
  }
}

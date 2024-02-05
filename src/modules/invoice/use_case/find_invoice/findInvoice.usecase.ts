import IInvoiceGateway from '../../gateway/invoice.gateway';
import {
  IFindInvoiceUseCaseInputDTO,
  IFindInvoiceUseCaseOutputDTO,
} from './findInvoice.usecase.dto';

export default class FindInvoiceUseCase {
  constructor(private invoiceRepository: IInvoiceGateway) {}

  async execute(
    input: IFindInvoiceUseCaseInputDTO,
  ): Promise<IFindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
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
      total: invoice.total,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}

import GenerateInvoiceUseCase from '../../../modules/invoice/use_case/generate_invoice/generateInvoice.usecase';
import { IInvoiceGenerateSchema } from '../validators/schemas/invoice.schema';

export default class InvoiceController {
  constructor(private generateInvoiceUseCase: GenerateInvoiceUseCase) {}

  async generate(data: IInvoiceGenerateSchema) {
    return this.generateInvoiceUseCase.execute(data);
  }
}

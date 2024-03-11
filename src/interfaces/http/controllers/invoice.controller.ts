import GenerateInvoiceUseCase from '../../../modules/invoice/use_case/generate_invoice/generateInvoice.usecase';
import FindInvoiceUseCase from '../../../modules/invoice/use_case/find_invoice/findInvoice.usecase';
import { IInvoiceGenerateSchema } from '../validators/schemas/invoice.schema';
import { IIdSchema } from '../validators/schemas/shared.schema';

export default class InvoiceController {
  constructor(
    private generateInvoiceUseCase: GenerateInvoiceUseCase,
    private findInvoiceUseCase: FindInvoiceUseCase,
  ) {}

  async generate(data: IInvoiceGenerateSchema) {
    return this.generateInvoiceUseCase.execute(data);
  }

  async findById(data: IIdSchema) {
    return this.findInvoiceUseCase.execute(data);
  }
}

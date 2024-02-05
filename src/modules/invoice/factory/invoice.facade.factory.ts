import InvoiceFacade from '../facade/invoice.facade';
import InvoiceRepository from '../repository/invoice.repository';
import FindInvoiceUseCase from '../use_case/find_invoice/findInvoice.usecase';
import GenerateInvoiceUseCase from '../use_case/generate_invoice/generateInvoice.usecase';

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUseCase(repository);
    const generateUsecase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUseCase: generateUsecase,
      findUseCase: findUsecase,
    });

    return facade;
  }
}

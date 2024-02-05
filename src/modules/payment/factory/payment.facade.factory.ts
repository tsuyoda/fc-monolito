import IPaymentFacade from '../facade/facade.interface';
import PaymentFacade from '../facade/payment.facade';
import TransactionRepostiory from '../repository/transaction.repository';
import ProcessPaymentUseCase from '../use_case/process_payment/processPayment.usecase';

export default class PaymentFacadeFactory {
  static create(): IPaymentFacade {
    const repository = new TransactionRepostiory();
    const usecase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade(usecase);
    return facade;
  }
}

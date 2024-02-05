import IUseCase from '../../../@shared/use_case/useCase.interface';
import Transaction from '../../domain/transaction.entity';
import IPaymentGateway from '../../gateway/payment.gateway';
import {
  IProcessPaymentInputDto,
  IProcessPaymentOutputDto,
} from './processPayment.dto';

export default class ProcessPaymentUseCase implements IUseCase {
  constructor(private transactionRepository: IPaymentGateway) {}

  async execute(
    input: IProcessPaymentInputDto,
  ): Promise<IProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();
    const persistTransaction = await this.transactionRepository.save(
      transaction,
    );

    return {
      transactionId: persistTransaction.id.value,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}

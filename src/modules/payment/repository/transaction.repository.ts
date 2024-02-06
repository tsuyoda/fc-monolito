import Transaction from '../domain/transaction.entity';
import transaction from '../domain/transaction.entity';
import IPaymentGateway from '../gateway/payment.gateway';
import TransactionModel from '../../../infrastructure/database/models/transaction.model';

export default class TransactionRepostiory implements IPaymentGateway {
  async save(input: transaction): Promise<transaction> {
    await TransactionModel.create({
      id: input.id.value,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return new Transaction({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });
  }
}

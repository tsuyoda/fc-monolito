import Transaction from '../domain/transaction.entity';

export default interface IPaymentGateway {
  save(input: Transaction): Promise<Transaction>;
}

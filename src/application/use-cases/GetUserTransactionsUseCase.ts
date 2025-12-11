// Use Case: Get User Transactions
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';

export class GetUserTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(userId: string): Promise<Transaction[]> {
    return await this.transactionRepository.findByUserId(userId);
  }
}

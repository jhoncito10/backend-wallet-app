// MongoDB Transaction Repository Implementation (Adapter)
import { ITransactionRepository } from '../../../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../../../domain/entities/Transaction';
import { TransactionModel } from '../models/TransactionModel';

export class MongoTransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await TransactionModel.create(transaction);
    return this.mapToEntity(newTransaction);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await TransactionModel.find({ userId }).sort({ createdAt: -1 });
    return transactions.map((tx) => this.mapToEntity(tx));
  }

  private mapToEntity(doc: any): Transaction {
    return {
      id: doc._id.toString(),
      userId: doc.userId,
      type: doc.type,
      amount: doc.amount,
      description: doc.description,
      createdAt: doc.createdAt,
    };
  }
}

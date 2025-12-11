// MongoDB Balance Repository Implementation (Adapter)
import { IBalanceRepository } from '../../../../domain/repositories/IBalanceRepository';
import { Balance } from '../../../../domain/entities/Balance';
import { BalanceModel } from '../models/BalanceModel';

export class MongoBalanceRepository implements IBalanceRepository {
  async findByUserId(userId: string): Promise<Balance | null> {
    const balance = await BalanceModel.findOne({ userId });
    return balance ? this.mapToEntity(balance) : null;
  }

  async create(balance: Balance): Promise<Balance> {
    const newBalance = await BalanceModel.create(balance);
    return this.mapToEntity(newBalance);
  }

  async updateAmount(userId: string, amount: number): Promise<Balance | null> {
    const balance = await BalanceModel.findOneAndUpdate(
      { userId },
      { amount },
      { new: true }
    );
    return balance ? this.mapToEntity(balance) : null;
  }

  private mapToEntity(doc: any): Balance {
    return {
      id: doc._id.toString(),
      userId: doc.userId,
      amount: doc.amount,
      currency: doc.currency,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

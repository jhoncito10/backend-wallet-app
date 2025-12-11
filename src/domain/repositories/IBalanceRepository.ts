// Repository Interface: Balance Repository (Port)
import { Balance } from '../entities/Balance';

export interface IBalanceRepository {
  findByUserId(userId: string): Promise<Balance | null>;
  create(balance: Balance): Promise<Balance>;
  updateAmount(userId: string, amount: number): Promise<Balance | null>;
}

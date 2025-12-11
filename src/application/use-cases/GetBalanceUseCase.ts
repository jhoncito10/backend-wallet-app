// Use Case: Get Balance by User
import { IBalanceRepository } from '../../domain/repositories/IBalanceRepository';
import { Balance } from '../../domain/entities/Balance';

export class GetBalanceUseCase {
  constructor(private balanceRepository: IBalanceRepository) {}

  async execute(userId: string): Promise<Balance> {
    const balance = await this.balanceRepository.findByUserId(userId);
    
    if (!balance) {
      // Create initial balance if doesn't exist
      const newBalance: Balance = {
        userId,
        amount: 0,
        currency: 'USD',
      };
      return await this.balanceRepository.create(newBalance);
    }

    return balance;
  }
}

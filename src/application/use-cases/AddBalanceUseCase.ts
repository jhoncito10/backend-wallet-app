// Use Case: Add Balance to User
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';
import { IBalanceRepository } from '../../domain/repositories/IBalanceRepository';

export interface AddBalanceDTO {
  userId: string;
  amount: number;
  description: string;
}

export interface AddBalanceResponse {
  transaction: Transaction;
  newBalance: number;
}

export class AddBalanceUseCase {
  constructor(
    private balanceRepository: IBalanceRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(dto: AddBalanceDTO): Promise<AddBalanceResponse> {
    // Validate amount
    if (dto.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    // Get current user
    const balance = await this.balanceRepository.findByUserId(dto.userId);
    if (!balance) {
      throw new Error('User not found');
    }

    // Calculate new balance
    const newBalance = balance.amount + dto.amount;

    // Update user balance
    const updatedBalance = await this.balanceRepository.updateAmount(dto.userId, newBalance);
    if (!updatedBalance) {
      throw new Error('Failed to update balance');
    }

    // Create transaction record
    const transaction: Transaction = {
      userId: dto.userId,
      type: 'recharge',
      amount: dto.amount,
      description: dto.description,
    };

    const createdTransaction = await this.transactionRepository.create(transaction);

    return {
      transaction: createdTransaction,
      newBalance: updatedBalance.amount,
    };
  }
}

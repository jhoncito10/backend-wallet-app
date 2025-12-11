// Use Case: Deduct Balance from User
import { IBalanceRepository } from '../../domain/repositories/IBalanceRepository';
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';

export interface DeductBalanceDTO {
  userId: string;
  amount: number;
  description: string;
}

export interface DeductBalanceResponse {
  transaction: Transaction;
  newBalance: number;
}

export class DeductBalanceUseCase {
  constructor(
    private balanceRepository: IBalanceRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(dto: DeductBalanceDTO): Promise<DeductBalanceResponse> {
    // Validate amount
    if (dto.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    // Get current balance
    const balance = await this.balanceRepository.findByUserId(dto.userId);
    if (!balance) {
      throw new Error('Balance not found');
    }

    // Check sufficient balance
    if (balance.amount < dto.amount) {
      throw new Error('Insufficient balance');
    }

    // Calculate new balance
    const newBalance = balance.amount - dto.amount;

    // Update balance
    const updatedBalance = await this.balanceRepository.updateAmount(dto.userId, newBalance);
    if (!updatedBalance) {
      throw new Error('Failed to update balance');
    }

    // Create transaction record
    const transaction: Transaction = {
      userId: dto.userId,
      type: 'expense',
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

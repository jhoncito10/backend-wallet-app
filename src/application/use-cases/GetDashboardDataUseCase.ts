// Use Case: Get Dashboard Data
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IDocumentRepository } from '../../domain/repositories/IDocumentRepository';
import { ITransactionRepository } from '../../domain/repositories/ITransactionRepository';

export interface DashboardData {
  balance: number;
  documents: any[];
  transactions: any[];
}

export class GetDashboardDataUseCase {
  constructor(
    private userRepository: IUserRepository,
    private documentRepository: IDocumentRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(userId: string): Promise<DashboardData> {
    const [user, documents, transactions] = await Promise.all([
      this.userRepository.findById(userId),
      this.documentRepository.findByUserId(userId),
      this.transactionRepository.findByUserId(userId),
    ]);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      balance: user.balance,
      documents,
      transactions,
    };
  }
}

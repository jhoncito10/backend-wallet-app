// Transaction Controller
import { Response } from 'express';
import { AuthRequest } from '../../middleware/jwtAuthMiddleware';
import { GetUserTransactionsUseCase } from '../../../application/use-cases/GetUserTransactionsUseCase';

export class TransactionController {
  constructor(private getUserTransactionsUseCase: GetUserTransactionsUseCase) {}

  getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const transactions = await this.getUserTransactionsUseCase.execute(req.userId);

      res.status(200).json({
        success: true,
        transactions,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to get transactions' });
    }
  };
}

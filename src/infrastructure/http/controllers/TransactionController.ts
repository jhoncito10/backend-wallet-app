// Transaction Controller
import { Response } from 'express';
import { AuthRequest } from '../../middleware/jwtAuthMiddleware';
import { GetUserTransactionsUseCase } from '../../../application/use-cases/GetUserTransactionsUseCase';
import { AddBalanceUseCase } from '../../../application/use-cases/AddBalanceUseCase';
import { GetBalanceUseCase } from '../../../application/use-cases/GetBalanceUseCase';
import { DeductBalanceUseCase } from '../../../application/use-cases/DeductBalanceUseCase';

export class TransactionController {
  constructor(
    private getUserTransactionsUseCase: GetUserTransactionsUseCase,
    private addBalanceUseCase: AddBalanceUseCase,
    private getBalanceUseCase: GetBalanceUseCase,
    private deductBalanceUseCase: DeductBalanceUseCase
  ) {}

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

  addBalance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { amount, description } = req.body;

      if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Valid amount is required' });
        return;
      }

      const result = await this.addBalanceUseCase.execute({
        userId: req.userId,
        amount: Number(amount),
        description: description || 'Balance recharge',
      });

      res.status(201).json({
        success: true,
        message: 'Balance added successfully',
        transaction: result.transaction,
        newBalance: result.newBalance,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to add balance' });
    }
  };

  getBalance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const balance = await this.getBalanceUseCase.execute(req.userId);

      res.status(200).json({
        success: true,
        balance,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to get balance' });
    }
  };

  deductBalance = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { amount, description } = req.body;

      if (!amount || amount <= 0) {
        res.status(400).json({ error: 'Valid amount is required' });
        return;
      }

      const result = await this.deductBalanceUseCase.execute({
        userId: req.userId,
        amount: Number(amount),
        description: description || 'Expense',
      });

      res.status(201).json({
        success: true,
        message: 'Balance deducted successfully',
        transaction: result.transaction,
        newBalance: result.newBalance,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to deduct balance' });
    }
  };
}

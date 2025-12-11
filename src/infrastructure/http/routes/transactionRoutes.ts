// Transaction Routes
import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { jwtAuthMiddleware } from '../../middleware/jwtAuthMiddleware';

export const createTransactionRoutes = (
  transactionController: TransactionController,
  jwtSecret: string
): Router => {
  const router = Router();

  // All transaction routes require JWT authentication
  router.use(jwtAuthMiddleware(jwtSecret));

  router.get('/', transactionController.getTransactions);
  router.get('/balance', transactionController.getBalance);
  router.post('/add-balance', transactionController.addBalance);
  router.post('/deduct-balance', transactionController.deductBalance);

  return router;
};

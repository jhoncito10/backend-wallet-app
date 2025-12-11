// Dashboard Routes
import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { jwtAuthMiddleware } from '../../middleware/jwtAuthMiddleware';

export const createDashboardRoutes = (
  dashboardController: DashboardController,
  jwtSecret: string
): Router => {
  const router = Router();

  // All dashboard routes require JWT authentication
  router.use(jwtAuthMiddleware(jwtSecret));

  router.get('/', dashboardController.getDashboard);

  return router;
};

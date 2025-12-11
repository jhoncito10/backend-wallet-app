// Dashboard Controller
import { Response } from 'express';
import { AuthRequest } from '../../middleware/jwtAuthMiddleware';
import { GetDashboardDataUseCase } from '../../../application/use-cases/GetDashboardDataUseCase';

export class DashboardController {
  constructor(private getDashboardDataUseCase: GetDashboardDataUseCase) {}

  getDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const data = await this.getDashboardDataUseCase.execute(req.userId);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to get dashboard data' });
    }
  };
}

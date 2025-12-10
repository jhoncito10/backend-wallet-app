import { Request, Response } from "express";
import { GetDashboard } from "../../application/usecases/GetDashboard";

export class DashboardController {
  constructor(private dashboard: GetDashboard) {}

  getDashboard = async (req: Request, res: Response) => {
    const userId = "fake"; 
    const data = await this.dashboard.execute(userId);
    res.json(data);
  };
}

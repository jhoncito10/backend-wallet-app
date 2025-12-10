import { Router } from "express";
import { authMiddleware } from "../../infraestructure/security/AuthMiddleware";
import { DashboardController } from "../controllers/DashboardController";

export function dashboardRoutes(controller: DashboardController) {
  const router = Router();

  router.get("/", authMiddleware, controller.getDashboard);

  return router;
}

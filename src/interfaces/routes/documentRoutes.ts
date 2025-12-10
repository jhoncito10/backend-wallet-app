import { Router } from "express";
import { authMiddleware } from "../../infraestructure/security/AuthMiddleware";
import { DocumentController } from "../controllers/DocumentController";

export function documentRoutes(controller: DocumentController) {
  const router = Router();

  router.post("/generate", authMiddleware, controller.generate);

  return router;
}

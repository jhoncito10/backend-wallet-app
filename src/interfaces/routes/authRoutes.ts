import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export function authRoutes(controller: AuthController) {
  const router = Router();

  router.post("/register", controller.registerUser);
  router.post("/login", controller.loginUser);

  return router;
}

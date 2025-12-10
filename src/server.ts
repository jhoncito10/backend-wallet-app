import express from "express";
import mongoose from "mongoose";


import { RegisterUser } from "./application/usecases/RegisterUser";
import { LoginUser } from "./application/usecases/LoginUser";
import { GetDashboard } from "./application/usecases/GetDashboard";
import { GenerateDocument } from "./application/usecases/GenerateDocument";

import { AuthController } from "./interfaces/controllers/AuthController";
import { DashboardController } from "./interfaces/controllers/DashboardController";
import { DocumentController } from "./interfaces/controllers/DocumentController";

import { authRoutes } from "./interfaces/routes/authRoutes";
import { dashboardRoutes } from "./interfaces/routes/dashboardRoutes";
import { documentRoutes } from "./interfaces/routes/documentRoutes";
import { UserRepositoryMongo } from "./infraestructure/repositories/UserRepositoryMongo";

const app = express();
app.use(express.json());

// DB
mongoose.connect("mongodb://localhost:27017/wallet");

// DI
const userRepo = new UserRepositoryMongo();

const authController = new AuthController(
  new RegisterUser(userRepo),
  new LoginUser(userRepo)
);

const dashboardController = new DashboardController(new GetDashboard());
const documentController = new DocumentController(new GenerateDocument());

// Routes
app.use("/auth", authRoutes(authController));
app.use("/dashboard", dashboardRoutes(dashboardController));
app.use("/documents", documentRoutes(documentController));

app.listen(3000, () => console.log("Server on http://localhost:3000"));

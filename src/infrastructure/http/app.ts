// Express Application Setup
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Container } from '../di/Container';
import { fixedTokenMiddleware } from '../middleware/fixedTokenMiddleware';
import { createAuthRoutes } from '../http/routes/authRoutes';
import { createDashboardRoutes } from '../http/routes/dashboardRoutes';
import { createDocumentRoutes } from '../http/routes/documentRoutes';
import { createTransactionRoutes } from '../http/routes/transactionRoutes';

export class App {
  public app: Application;
  private container: Container;

  constructor(
    private fixedToken: string,
    private jwtSecret: string
  ) {
    this.app = express();
    this.container = Container.getInstance(jwtSecret);
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    // CORS
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      })
    );

    // Body parser
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Fixed token authentication for all API routes
    this.app.use('/api', fixedTokenMiddleware(this.fixedToken));
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'OK', message: 'Server is running' });
    });

    // API Routes
    this.app.use('/api/auth', createAuthRoutes(this.container.authController));
    this.app.use('/api/dashboard', createDashboardRoutes(this.container.dashboardController, this.jwtSecret));
    this.app.use('/api/documents', createDocumentRoutes(this.container.documentController, this.jwtSecret));
    this.app.use('/api/transactions', createTransactionRoutes(this.container.transactionController, this.jwtSecret));

    // 404 handler
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ error: 'Route not found' });
    });
  }

  private setupErrorHandling(): void {
    // Global error handler
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Error:', err);
      res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

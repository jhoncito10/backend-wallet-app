// Dependency Injection Container
import { MongoUserRepository } from '../database/mongodb/repositories/MongoUserRepository';
import { MongoDocumentRepository } from '../database/mongodb/repositories/MongoDocumentRepository';
import { MongoTransactionRepository } from '../database/mongodb/repositories/MongoTransactionRepository';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase';
import { GetUserBalanceUseCase } from '../../application/use-cases/GetUserBalanceUseCase';
import { GetUserDocumentsUseCase } from '../../application/use-cases/GetUserDocumentsUseCase';
import { GetUserTransactionsUseCase } from '../../application/use-cases/GetUserTransactionsUseCase';
import { GenerateDocumentUseCase } from '../../application/use-cases/GenerateDocumentUseCase';
import { GetDashboardDataUseCase } from '../../application/use-cases/GetDashboardDataUseCase';
import { AuthController } from '../http/controllers/AuthController';
import { DashboardController } from '../http/controllers/DashboardController';
import { DocumentController } from '../http/controllers/DocumentController';
import { TransactionController } from '../http/controllers/TransactionController';

export class Container {
  private static instance: Container;

  // Repositories
  public userRepository: MongoUserRepository;
  public documentRepository: MongoDocumentRepository;
  public transactionRepository: MongoTransactionRepository;

  // Use Cases
  public registerUserUseCase: RegisterUserUseCase;
  public loginUserUseCase: LoginUserUseCase;
  public getUserBalanceUseCase: GetUserBalanceUseCase;
  public getUserDocumentsUseCase: GetUserDocumentsUseCase;
  public getUserTransactionsUseCase: GetUserTransactionsUseCase;
  public generateDocumentUseCase: GenerateDocumentUseCase;
  public getDashboardDataUseCase: GetDashboardDataUseCase;

  // Controllers
  public authController: AuthController;
  public dashboardController: DashboardController;
  public documentController: DocumentController;
  public transactionController: TransactionController;

  private constructor(jwtSecret: string) {
    // Initialize Repositories
    this.userRepository = new MongoUserRepository();
    this.documentRepository = new MongoDocumentRepository();
    this.transactionRepository = new MongoTransactionRepository();

    // Initialize Use Cases
    this.registerUserUseCase = new RegisterUserUseCase(this.userRepository);
    this.loginUserUseCase = new LoginUserUseCase(this.userRepository, jwtSecret);
    this.getUserBalanceUseCase = new GetUserBalanceUseCase(this.userRepository);
    this.getUserDocumentsUseCase = new GetUserDocumentsUseCase(this.documentRepository);
    this.getUserTransactionsUseCase = new GetUserTransactionsUseCase(this.transactionRepository);
    this.generateDocumentUseCase = new GenerateDocumentUseCase(this.documentRepository);
    this.getDashboardDataUseCase = new GetDashboardDataUseCase(
      this.userRepository,
      this.documentRepository,
      this.transactionRepository
    );

    // Initialize Controllers
    this.authController = new AuthController(
      this.registerUserUseCase,
      this.loginUserUseCase
    );
    this.dashboardController = new DashboardController(this.getDashboardDataUseCase);
    this.documentController = new DocumentController(
      this.generateDocumentUseCase,
      this.getUserDocumentsUseCase
    );
    this.transactionController = new TransactionController(this.getUserTransactionsUseCase);
  }

  public static getInstance(jwtSecret: string): Container {
    if (!Container.instance) {
      Container.instance = new Container(jwtSecret);
    }
    return Container.instance;
  }
}

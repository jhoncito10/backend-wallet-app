// Document Controller
import { Response } from 'express';
import { AuthRequest } from '../../middleware/jwtAuthMiddleware';
import { GenerateDocumentUseCase } from '../../../application/use-cases/GenerateDocumentUseCase';
import { GetUserDocumentsUseCase } from '../../../application/use-cases/GetUserDocumentsUseCase';

export class DocumentController {
  constructor(
    private generateDocumentUseCase: GenerateDocumentUseCase,
    private getUserDocumentsUseCase: GetUserDocumentsUseCase
  ) {}

  generateDocument = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { name } = req.body;

      if (!name) {
        res.status(400).json({ error: 'Document name is required' });
        return;
      }

      const document = await this.generateDocumentUseCase.execute({
        userId: req.userId,
        name,
      });

      res.status(201).json({
        success: true,
        message: 'Document generation started',
        document,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to generate document' });
    }
  };

  getDocuments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const documents = await this.getUserDocumentsUseCase.execute(req.userId);

      res.status(200).json({
        success: true,
        documents,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Failed to get documents' });
    }
  };
}

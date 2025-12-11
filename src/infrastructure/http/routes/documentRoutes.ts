// Document Routes
import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';
import { jwtAuthMiddleware } from '../../middleware/jwtAuthMiddleware';

export const createDocumentRoutes = (
  documentController: DocumentController,
  jwtSecret: string
): Router => {
  const router = Router();

  // All document routes require JWT authentication
  router.use(jwtAuthMiddleware(jwtSecret));

  router.post('/generate', documentController.generateDocument);
  router.get('/', documentController.getDocuments);

  return router;
};

// Repository Interface: Document Repository (Port)
import { Document } from '../entities/Document';

export interface IDocumentRepository {
  create(document: Document): Promise<Document>;
  findByUserId(userId: string): Promise<Document[]>;
  findById(id: string): Promise<Document | null>;
  updateStatus(documentId: string, status: Document['status']): Promise<Document | null>;
}

// MongoDB Document Repository Implementation (Adapter)
import { IDocumentRepository } from '../../../../domain/repositories/IDocumentRepository';
import { Document } from '../../../../domain/entities/Document';
import { DocumentModel } from '../models/DocumentModel';

export class MongoDocumentRepository implements IDocumentRepository {
  async create(document: Document): Promise<Document> {
    const newDocument = await DocumentModel.create(document);
    return this.mapToEntity(newDocument);
  }

  async findByUserId(userId: string): Promise<Document[]> {
    const documents = await DocumentModel.find({ userId }).sort({ createdAt: -1 });
    return documents.map((doc) => this.mapToEntity(doc));
  }

  async findById(id: string): Promise<Document | null> {
    const document = await DocumentModel.findById(id);
    return document ? this.mapToEntity(document) : null;
  }

  async updateStatus(documentId: string, status: Document['status']): Promise<Document | null> {
    const document = await DocumentModel.findByIdAndUpdate(
      documentId,
      { status },
      { new: true }
    );
    return document ? this.mapToEntity(document) : null;
  }

  private mapToEntity(doc: any): Document {
    return {
      id: doc._id.toString(),
      userId: doc.userId,
      name: doc.name,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

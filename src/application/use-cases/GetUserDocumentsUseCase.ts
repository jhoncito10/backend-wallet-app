// Use Case: Get User Documents
import { IDocumentRepository } from '../../domain/repositories/IDocumentRepository';
import { Document } from '../../domain/entities/Document';

export class GetUserDocumentsUseCase {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute(userId: string): Promise<Document[]> {
    return await this.documentRepository.findByUserId(userId);
  }
}

// Use Case: Generate Document
import { IDocumentRepository } from '../../domain/repositories/IDocumentRepository';
import { Document } from '../../domain/entities/Document';

export interface GenerateDocumentDTO {
  userId: string;
  name: string;
}

export class GenerateDocumentUseCase {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute(dto: GenerateDocumentDTO): Promise<Document> {
    const document: Document = {
      userId: dto.userId,
      name: dto.name,
      status: 'pending',
    };

    const createdDocument = await this.documentRepository.create(document);
    
    // Simulate document processing (in real app, this would be async)
    setTimeout(async () => {
      await this.documentRepository.updateStatus(createdDocument.id!, 'completed');
    }, 3000);

    return createdDocument;
  }
}

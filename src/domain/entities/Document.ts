// Domain Entity: Document
export interface Document {
  id?: string;
  userId: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

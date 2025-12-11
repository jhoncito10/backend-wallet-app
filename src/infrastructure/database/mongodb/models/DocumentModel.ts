// MongoDB Document Model
import mongoose, { Schema, Document as MongoDocument } from 'mongoose';
import { Document } from '../../../../domain/entities/Document';

export interface DocumentModelType extends Omit<Document, 'id'>, MongoDocument {}

const documentSchema = new Schema<DocumentModelType>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster queries
documentSchema.index({ userId: 1, createdAt: -1 });

export const DocumentModel = mongoose.model<DocumentModelType>('Document', documentSchema);

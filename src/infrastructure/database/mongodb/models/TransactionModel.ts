// MongoDB Transaction Model
import mongoose, { Schema, Document as MongoDocument } from 'mongoose';
import { Transaction } from '../../../../domain/entities/Transaction';

export interface TransactionDocument extends Omit<Transaction, 'id'>, MongoDocument {}

const transactionSchema = new Schema<TransactionDocument>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['recharge', 'expense'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster queries
transactionSchema.index({ userId: 1, createdAt: -1 });

export const TransactionModel = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

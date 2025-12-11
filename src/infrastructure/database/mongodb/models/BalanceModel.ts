// MongoDB Balance Model
import mongoose, { Schema, Document as MongoDocument } from 'mongoose';
import { Balance } from '../../../../domain/entities/Balance';

export interface BalanceDocument extends Omit<Balance, 'id'>, MongoDocument {}

const balanceSchema = new Schema<BalanceDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster queries
balanceSchema.index({ userId: 1 });

export const BalanceModel = mongoose.model<BalanceDocument>('Balance', balanceSchema);

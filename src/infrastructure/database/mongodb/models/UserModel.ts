// MongoDB User Model
import mongoose, { Schema, Document as MongoDocument } from 'mongoose';
import { User } from '../../../../domain/entities/User';

export interface UserDocument extends Omit<User, 'id'>, MongoDocument {}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster queries
userSchema.index({ email: 1 });

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

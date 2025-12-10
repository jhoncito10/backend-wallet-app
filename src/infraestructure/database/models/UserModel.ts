import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 100 } // valor ficticio
});

export const UserModel = mongoose.model("User", UserSchema);

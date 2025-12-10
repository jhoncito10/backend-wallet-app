import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/models/UserModel";

export class UserRepositoryMongo implements UserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}

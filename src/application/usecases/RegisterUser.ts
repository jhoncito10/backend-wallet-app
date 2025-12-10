import bcrypt from "bcryptjs";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class RegisterUser {
  constructor(private userRepo: UserRepository) {}

  async execute(data: User): Promise<User> {
    const exists = await this.userRepo.findByEmail(data.email);
    if (exists) throw new Error("El usuario ya existe");

    const hashed = await bcrypt.hash(data.password, 10);
    data.password = hashed;

    return await this.userRepo.create(data);
  }
}

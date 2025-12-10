import bcrypt from "bcryptjs";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class LoginUser {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Credenciales incorrectas");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Credenciales incorrectas");

    return user;
  }
}

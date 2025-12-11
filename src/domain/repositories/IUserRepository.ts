// Repository Interface: User Repository (Port)
import { User } from '../entities/User';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateBalance(userId: string, newBalance: number): Promise<User | null>;
}

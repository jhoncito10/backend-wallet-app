// Use Case: Register User
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user: User = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      balance: 1000, // Initial balance
    };

    return await this.userRepository.create(user);
  }
}

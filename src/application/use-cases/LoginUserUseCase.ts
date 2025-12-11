// Use Case: Login User
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    balance: number;
  };
}

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtSecret: string
  ) {}

  async execute(dto: LoginUserDTO): Promise<LoginResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    };
  }
}

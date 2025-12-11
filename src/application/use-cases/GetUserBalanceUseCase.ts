// Use Case: Get User Balance
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class GetUserBalanceUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<number> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.balance;
  }
}

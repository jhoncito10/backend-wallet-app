// Domain Entity: Transaction
export interface Transaction {
  id?: string;
  userId: string;
  type: 'recharge' | 'expense';
  amount: number;
  description: string;
  createdAt?: Date;
}

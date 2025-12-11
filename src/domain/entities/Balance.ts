// Domain Entity: Balance
export interface Balance {
  id?: string;
  userId: string;
  amount: number;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

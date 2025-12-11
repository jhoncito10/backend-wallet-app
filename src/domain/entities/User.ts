// Domain Entity: User
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

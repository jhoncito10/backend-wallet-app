export interface Transaction {
    id?: string;
    userId: string;
    type: "recharge" | "expense";
    amount: number;
    date: Date;
  }
  
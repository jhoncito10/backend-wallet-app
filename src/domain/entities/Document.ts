export interface Document {
    id?: string;
    userId: string;
    name: string;
    date: Date;
    status: "generated" | "processing";
  }
  
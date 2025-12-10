export class GetDashboard {
    async execute(userId: string) {
      return {
        balance: 1500,
        documents: [
          { name: "Contrato A", date: new Date(), status: "generated" }
        ],
        transactions: [
          { type: "recharge", amount: 50, date: new Date() },
          { type: "expense", amount: -20, date: new Date() }
        ]
      };
    }
  }
  
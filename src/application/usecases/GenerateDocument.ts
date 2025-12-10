export class GenerateDocument {
    async execute(userId: string) {
      return {
        id: "DOC-" + Date.now(),
        name: "Nuevo documento",
        date: new Date(),
        status: "processing"
      };
    }
  }
  
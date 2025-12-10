import { Request, Response } from "express";
import { GenerateDocument } from "../../application/usecases/GenerateDocument";

export class DocumentController {
  constructor(private generateDocument: GenerateDocument) {}

  generate = async (req: Request, res: Response) => {
    const userId = "fake";
    const doc = await this.generateDocument.execute(userId);
    res.json(doc);
  };
}

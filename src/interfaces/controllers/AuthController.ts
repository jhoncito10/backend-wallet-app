import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/RegisterUser";
import { LoginUser } from "../../application/usecases/LoginUser";

export class AuthController {
  constructor(
    private register: RegisterUser,
    private login: LoginUser
  ) {}

  registerUser = async (req: Request, res: Response) => {
    try {
      const user = await this.register.execute(req.body);
      res.json(user);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const user = await this.login.execute(req.body.email, req.body.password);
      res.json({ message: "Login exitoso", user });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };
}

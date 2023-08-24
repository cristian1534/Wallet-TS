import { Request, Response } from "express";
import { UserUseCase } from "../../application/userUseCase";
import bcrypt from "bcrypt";
import { createToken } from "../helper/token.creator";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public addCtrl = async ({ body }: Request, res: Response) => {
    try {
      const { password, ...otherFields } = body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userWithHashedPassword = {
        ...otherFields,
        hashedPassword,
      };

      const user = await this.userUseCase.addUser(userWithHashedPassword);

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send("Error adding new USER");
    }
  };

  public logCtrl = async ({ body }: Request, res: Response) => {
    try {
      const { email, password } = body;
      const user = await this.userUseCase.logUser({
        email,
        hashedPassword: password,
      });

      if (!user) return res.status(400).send("Wrong EMAIL or PASSWORD");
      const token = createToken(user);

      return res.status(200).json({
        name: user.name,
        email: user.email,
        token,
      });
      
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error when LOGGING IN USER");
    }
  };
}

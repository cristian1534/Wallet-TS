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
      return res.status(500).send("Error when LOGGING IN USER");
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userUseCase.getUsers();
      if (!users) return res.status(404).send("USERS not found");

      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send("Error when fetching USERS");
    }
  };

  public getUser = async ({ params }: Request, res: Response) => {
    try {
      const { uuid } = params;
      const user = await this.userUseCase.getUser(uuid);
      if (!user) return res.status(404).send("USER not found");

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send("Error when fetching USER");
    }
  };
}

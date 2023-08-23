import { Request, Response } from "express";
import { UserUseCase } from "../../application/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public addCtrl = async ({ body }: Request, res: Response) => {
    try {
      const user = await this.userUseCase.addUser(body);
      res.status(200).send({ user });
    } catch (err) {
      res.status(500).send("Error adding new USER");
    }
  };
}

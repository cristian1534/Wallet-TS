import { Request, Response } from "express";
import { UserUseCase } from "../../application/userUseCase";
import bcrypt from "bcrypt";
import { createToken } from "../helper/token.creator";
import { HttpResponse } from "../error/validation.error";
import { userSchema, loginSchema } from "../helper/validation.schema";

export class UserController {
  constructor(
    private userUseCase: UserUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addCtrl = async ({ body }: Request, res: Response) => {
    try {
      const { error, value } = userSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error);
      }

      const { password, ...otherFields } = value;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userWithHashedPassword = {
        ...otherFields,
        hashedPassword,
      };

      const user = await this.userUseCase.addUser(userWithHashedPassword);

      return this.httpResponse.Ok(res, user);
    } catch (err) {
      return this.httpResponse.Error(res, "Error adding new USER");
    }
  };

  public logCtrl = async ({ body }: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error);
      }

      const { email, password } = value;
      const user = await this.userUseCase.logUser({
        email,
        hashedPassword: password,
      });

      if (!user) return this.httpResponse.NotFound(res, "USER not found");
      const token = createToken(user);

      return this.httpResponse.Ok(res, {
        name: user.name,
        email: user.email,
        token,
      });
    } catch (err) {
      return this.httpResponse.Error(res, "Error when LOGGING IN USER");
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userUseCase.getUsers();
      if (!users) return res.status(404).send("USERS not found");

      return this.httpResponse.Ok(res, users);
    } catch (err) {
      return this.httpResponse.Error(res, "Error when fetching USERS");
    }
  };

  public getUser = async ({ params }: Request, res: Response) => {
    try {
      const { uuid } = params;
      const user = await this.userUseCase.getUser(uuid);
      if (!user) return res.status(404).send("USER not found");

      return this.httpResponse.Ok(res, user);
    } catch (err) {
      return this.httpResponse.Error(res, "Error when fetching USER");
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { uuid } = req.params;
      const updatedUser = await this.userUseCase.updateUser(uuid, body);
      if (!updatedUser) return res.status(404).send("USER not found to update");

      return this.httpResponse.Ok(res, updatedUser);
    } catch (err) {
      return this.httpResponse.Error(res, "Error when updating USER");
    }
  };

  public deleteUser = async ({ params }: Request, res: Response) => {
    try {
      const { uuid } = params;
      const deletedUser = await this.userUseCase.deleteUser(uuid);

      if (!deletedUser) {
        return this.httpResponse.NotFound(res, "USER not found");
      }

      return this.httpResponse.Ok(res, "USER when deleting successfully");
    } catch (err) {}
  };
}

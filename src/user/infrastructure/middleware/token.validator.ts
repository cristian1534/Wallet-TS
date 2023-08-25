import { Request, Response, NextFunction } from "express";
import jwt from "jwt-simple";
import moment from "moment";
import { HttpResponse } from "../error/validation.error";
import { UserEntity } from "../../domain/user.entity";

let tokenUser: UserEntity | undefined;

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const httpResponse = new HttpResponse();
  const SECRET_TOKEN: string = process.env.SECRET_TOKEN as string;

  if (!req.headers.authorization) {
    return httpResponse.UnAuthorized(res, "UnAuthorized");
  }

  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.decode(token, SECRET_TOKEN);

  if (payload.exp <= moment().unix()) {
    return httpResponse.BadRequest(res, "Permission expired");
  }

  tokenUser = payload.sub;

  next();
}


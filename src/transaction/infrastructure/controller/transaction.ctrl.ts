import { TransactionUseCase } from "transaction/application/transactionUseCase";
import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/error/validation.error";
import { transactionSchema } from "../../../transaction/infrastructure/helper/validation.schema";
import jwt from "jwt-simple";

export class TransactionController {
  constructor(
    private transactionUseCase: TransactionUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addTransaction = async (req: Request, res: Response) => {
    try {
      const SECRET_TOKEN = process.env.SECRET_TOKEN as string;
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return this.httpResponse.BadRequest(res, "Token not provided");
      }

      let payload = jwt.decode(token, SECRET_TOKEN);

      const { error, value } = transactionSchema.validate(req.body);
      if (error) return this.httpResponse.BadRequest(res, error);

      const transactionData = {
        type: value.type,
        amount: value.amount,
        userId: payload.sub,
      };

      const transaction = await this.transactionUseCase.addTransaction(
        transactionData
      );
      return this.httpResponse.Ok(res, transaction);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };
}

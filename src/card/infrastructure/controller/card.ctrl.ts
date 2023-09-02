import { CardUseCase } from "../../application/cardUseCase";
import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/error/validation.error";
import { cardSchema } from "../helper/validation.schema";
import jwt from "jwt-simple";

export class CardController {
  constructor(
    private cardUseCase: CardUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addCard = async (req: Request, res: Response) => {
    try {
      const SECRET_TOKEN = process.env.SECRET_TOKEN as string;
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return this.httpResponse.BadRequest(res, "Token not provided");
      }

      let payload = jwt.decode(token, SECRET_TOKEN);

      const { error, value } = cardSchema.validate(req.body);
      if (error) return this.httpResponse.BadRequest(res, error);

      const cardData = {
        type: value.type,
        cardNumber: value.cardNumber,
        propertyUser: value.propertyUser,
        userId: payload.sub,
      };

      const card = await this.cardUseCase.addCard(cardData);
      return this.httpResponse.Ok(res, card);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };
}

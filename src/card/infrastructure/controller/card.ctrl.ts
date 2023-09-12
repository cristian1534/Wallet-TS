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
        balance: value.balance,
      };

      const card = await this.cardUseCase.addCard(cardData);
      return this.httpResponse.Ok(res, card);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };

  public getCards = async (req: Request, res: Response) => {
    try {
      const cards = await this.cardUseCase.getCards();
      if (!cards) return this.httpResponse.NotFound(res, "CARDS not found");

      return this.httpResponse.Ok(res, cards);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };

  public getCard = async ({ params }: Request, res: Response) => {
    try {
      const { uuid } = params;
      const card = await this.cardUseCase.getCard(uuid);
      if (!card) return this.httpResponse.NotFound(res, "CARD not found");

      return this.httpResponse.Ok(res, card);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };

  public updateCard = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const updatedCard = await this.cardUseCase.updateCard(uuid, req.body);
      if (!updatedCard)
        return this.httpResponse.NotFound(res, "CARD not found to update");

      return this.httpResponse.Ok(res, updatedCard);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };

  public deleteCard = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const deletedCard = await this.cardUseCase.deleteCard(uuid);
      if (!deletedCard)
        return this.httpResponse.NotFound(res, "CARD not found");

      return this.httpResponse.Ok(res, deletedCard);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  };
}

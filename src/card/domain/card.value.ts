import { CardEntity } from "./card.entity";
import { CardType } from "./card.entity";

// REGISTER CARD...
export class CardValue implements CardEntity {
  uuid: string;
  type: CardType;
  cardNumber: number;
  propertyUser: string;
  userId: string;

  constructor({
    uuid,
    type,
    cardNumber,
    propertyUser,
    userId
  }: {
    uuid: string;
    type: CardType;
    cardNumber: number;
    propertyUser: string;
    userId: string;
  }) {
    this.uuid = uuid;
    this.type = type;
    this.cardNumber = cardNumber;
    this.propertyUser = propertyUser;
    this.userId = userId;
  }
}

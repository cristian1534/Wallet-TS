import { CardEntity } from "./card.entity";
import { CardType } from "./card.entity";

// REGISTER CARD...
export class CardValue implements CardEntity {
  uuid: string;
  type: CardType;
  cardNumber: number;
  propertyUser: string;
  userId: string;
  balance: number = 200000;

  constructor({
    uuid,
    type,
    cardNumber,
    propertyUser,
    userId,
    balance,
  }: {
    uuid: string;
    type: CardType;
    cardNumber: number;
    propertyUser: string;
    userId: string;
    balance?: number;
  }) {
    this.uuid = uuid;
    this.type = type;
    this.cardNumber = cardNumber;
    this.propertyUser = propertyUser;
    this.userId = userId;
    if (balance !== undefined) {
      this.balance = balance;
    }
  }
}

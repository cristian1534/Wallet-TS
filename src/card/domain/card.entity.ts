export type CardType = "Credit" | "Debit";

export interface CardEntity {
  uuid: string;
  type: CardType;
  cardNumber: number;
  propertyUser: string;
  userId: string;
  balance: number;
}

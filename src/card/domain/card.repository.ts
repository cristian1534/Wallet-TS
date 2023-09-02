import { CardEntity } from "./card.entity";

export interface CardRepository {
  addCard(card: CardEntity): Promise<CardEntity | null>;
}

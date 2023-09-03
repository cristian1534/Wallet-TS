import { CardEntity } from "./card.entity";

export interface CardRepository {
  addCard(card: CardEntity): Promise<CardEntity | null>;
  getCards(): Promise<CardEntity[] | null>;
  getCard(uuid: string): Promise<CardEntity | null>;
  updateCard(
    uuid: string,
    data: Partial<CardEntity>
  ): Promise<CardEntity | null>;
  deleteCard(uuid: string): Promise<CardEntity | null>;
}

import { CardRepository } from "../domain/card.repository";
import { CardEntity, CardType } from "../domain/card.entity";
import { CardValue } from "../domain/card.value";
import { v4 as uuidGenerator } from "uuid";

export class CardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async addCard({
    type,
    cardNumber,
    propertyUser,
    userId,
    balance,
  }: {
    type: CardType;
    cardNumber: number;
    propertyUser: string;
    userId: string;
    balance: number;
  }) {
    const uuid = uuidGenerator();
    const cardValue = new CardValue({
      uuid,
      type,
      cardNumber,
      propertyUser,
      userId,
      balance,
    });
    const cardCreated = this.cardRepository.addCard(cardValue);
    return cardCreated;
  }

  public async getCards() {
    const cards = this.cardRepository.getCards();
    return cards;
  }

  public async getCard(uuid: string) {
    const card = this.cardRepository.getCard(uuid);
    return card;
  }

  public async updateCard(uuid: string, data: Partial<CardEntity>) {
    const updatedCard = await this.cardRepository.updateCard(uuid, data);
    return updatedCard;
  }

  public async deleteCard(uuid: string) {
    const deletedCard = await this.cardRepository.deleteCard(uuid);
    return deletedCard;
  }
}

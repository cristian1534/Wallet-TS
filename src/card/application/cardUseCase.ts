import { CardRepository } from "../domain/card.repository";
import { CardType } from "../domain/card.entity";
import { CardValue } from "../domain/card.value";
import { v4 as uuidGenerator } from "uuid";

export class CardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  public async addCard({
    type,
    cardNumber,
    propertyUser,
    userId
  }: {
    type: CardType;
    cardNumber: number;
    propertyUser: string;
    userId: string
  }) {
    const uuid = uuidGenerator();
    const cardValue = new CardValue({ uuid, type, cardNumber, propertyUser, userId });
    const cardCreated = this.cardRepository.addCard(cardValue);
    return cardCreated;
  }
}

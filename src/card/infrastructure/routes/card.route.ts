import { Router } from "express";
import { MySQLRepository } from "../../infrastructure/repository/mysql.repository";
import { CardUseCase } from "../../application/cardUseCase";
import { CardController } from "../../infrastructure/controller/card.ctrl";
import { validateToken } from "../../../user/infrastructure/middleware/token.validator";

const route = Router();

const cardRepository = new MySQLRepository();
const cardUseCase = new CardUseCase(cardRepository);
const cardCtrl = new CardController(cardUseCase);

route.post("/card", validateToken, cardCtrl.addCard);
route.get("/card", validateToken, cardCtrl.getCards);
route.get("/card/:uuid", validateToken, cardCtrl.getCard);
route.patch("/card/:uuid", validateToken, cardCtrl.updateCard);
route.delete("/card/:uuid", validateToken, cardCtrl.deleteCard);

export default route;

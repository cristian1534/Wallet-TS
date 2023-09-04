import { Router } from "express";
import { MySQLRepository } from "../../../card/infrastructure/repository/mysql.repository";
import { CardUseCase } from "../../../card/application/cardUseCase";
import { CardController } from "../../../card/infrastructure/controller/card.ctrl";
import { validateToken } from "../middleware/token.validator";

const route = Router();

const cardRepository = new MySQLRepository();
const cardUseCase = new CardUseCase(cardRepository);
const cardCtrl = new CardController(cardUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       required:
 *         - JWT Token
 *
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - type
 *         - cardNumber
 *         - propertyUser
 *       properties:
 *         type:
 *           type: string
 *           description: Credit or Debit
 *         cardNumber:
 *           type: number
 *           description: 16 num of card
 *         propertyUser:
 *           type: string
 *           description: Owner's name
 *         example:
 *           type: "Credit"
 *           numberCard: 1234123412341234
 *           propertyUser: "Pedro Gomez"
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: CARD
 *   description: REST API NodeJS-TS Hexagonal Structure.
 */

/**
 * @swagger
 * /card:
 *   post:
 *     summary: Create a new CARD
 *     tags: [CARD]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Error adding new CARD
 */
route.post("/card", validateToken, cardCtrl.addCard);

/**
 * @swagger
 * /card:
 *   get:
 *     summary: Get all CARDS
 *     tags: [CARD]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: Error when fetching CARDS
 */
route.get("/card", validateToken, cardCtrl.getCards);

/**
 * @swagger
 * /card/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get the CARD selected if created.
 *     tags: [CARD]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: CARD fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: CARD not found
 *       500:
 *         description: Error fetching CARD
 */
route.get("/card/:uuid", validateToken, cardCtrl.getCard);

/**
 * @swagger
 * /card/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: Update the CARD selected if created.
 *     tags: [CARD]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CARD's id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Card'
 *       500:
 *         description: Error when updating CARD
 *       404:
 *         description: CARD not found
 */
route.patch("/card/:uuid", validateToken, cardCtrl.updateCard);

/**
 * @swagger
 * /card/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the CARD selected if created.
 *     tags: [CARD]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CARD's id.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: Error when deleting CARD
 */
route.delete("/card/:uuid", validateToken, cardCtrl.deleteCard);

export default route;

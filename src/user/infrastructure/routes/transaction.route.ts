import { Router } from "express";
import { TransactionController } from "../../../transaction/infrastructure/controller/transaction.ctrl";
import { MySQLRepository } from "../../../transaction/infrastructure/repository/mysql.repository";
import { TransactionUseCase } from "../../../transaction/application/transactionUseCase";
import { validateToken } from "../../../user/infrastructure/middleware/token.validator";

const route = Router();

const transactionRepository = new MySQLRepository();
const transactionUseCase = new TransactionUseCase(transactionRepository);
const transactionCtrl = new TransactionController(transactionUseCase);


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
 *     Transaction:
 *       type: object
 *       required:
 *         - type
 *         - amount
 *       properties:
 *         type:
 *           type: string
 *           description: Transfer or Payment
 *         amount:
 *           type: number
 *           description: 16 num max
 *         example:
 *           type: "Transfer"
 *           amount: 500
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: TRANSACTION
 *   description: REST API NodeJS-TS Hexagonal Structure.
 */

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a new TRANSACTION
 *     tags: [TRANSACTION]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error adding new TRANSACTION
 */
route.post("/transaction", validateToken, transactionCtrl.addTransaction);


/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all TRANSACTIONS
 *     tags: [TRANSACTION]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: Error when fetching TRANSACTIONS
 */
route.get("/transaction", validateToken, transactionCtrl.getTransactions);


/**
 * @swagger
 * /transaction/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the TRANSACTION selected if created.
 *     tags: [TRANSACTION]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The TRANSACTION's id.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: Error when deleting TRANSACTION
 */
route.delete(
  "/transaction/:uuid",
  validateToken,
  transactionCtrl.deleteTransaction
);

export default route;

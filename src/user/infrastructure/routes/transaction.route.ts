import { Router } from "express";
import { TransactionController } from "../../../transaction/infrastructure/controller/transaction.ctrl";
import { MySQLRepository } from "../../../transaction/infrastructure/repository/mysql.repository";
import { TransactionUseCase } from "../../../transaction/application/transactionUseCase";
import { validateToken } from "../../../user/infrastructure/middleware/token.validator";

const route = Router();

const transactionRepository = new MySQLRepository();
const transactionUseCase = new TransactionUseCase(transactionRepository);
const transactionCtrl = new TransactionController(transactionUseCase);

route.post("/transaction", validateToken, transactionCtrl.addTransaction);

export default route;

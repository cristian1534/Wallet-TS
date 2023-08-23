import { Router } from "express";
import { MySQLRepository } from "../repository/mysql.repository";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";

const route = Router();

const userRepository = new MySQLRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);

route.post("/user", userCtrl.addCtrl);

export default route;
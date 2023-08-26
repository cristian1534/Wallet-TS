import { Router } from "express";
import { MySQLRepository } from "../repository/mysql.repository";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";
import { validateToken } from "../middleware/token.validator";

const route = Router();

const userRepository = new MySQLRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);



/**
 * @swagger
 * components:
 *   securitySchemes: 
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        required:
 *          - JWT Token
 *       
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: USER's name.
 *         email:
 *           type: string
 *           description: USER's email.
 *         password:
 *           type: string
 *           description: USER's password.         
 *       example:
 *         name: "Cristian"
 *         email: "cristian@gmail.com"
 *         password: "unodostres"
 * 
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: USER's email.
 *         password:
 *           type: string
 *           description: USER's password.         
 *       example:
 *         email: "cristian@gmail.com"
 *         password: "unodostres"
*/

/**
 * @swagger
 * tags: 
 *   name: USER
 *   description: REST API NodeJS-TS Hexagonal Structure.
*/

/**
 * @swagger
  * /user:
 *   post:
 *     summary: Create a new USER
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Error when adding USER
 */
route.post("/user", userCtrl.addCtrl);


/**
 * @swagger
  * /user/auth:
 *   post:
 *     summary: Login USER
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Internal Error Server
 */
route.post("/user/auth", userCtrl.logCtrl);
route.get("/user", userCtrl.getUsers);
route.get("/user/:uuid", validateToken, userCtrl.getUser);
route.patch("/user/:uuid", validateToken, userCtrl.updateUser);
route.delete("/user/:uuid", validateToken, userCtrl.deleteUser);

export default route;

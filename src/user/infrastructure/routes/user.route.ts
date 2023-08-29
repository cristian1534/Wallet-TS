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
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: USER's name
 *         email: 
 *           type: string
 *           description: USER's email
 *       example:
 *         name: "Pedro"
 *         email: "pedro@gmail.com"
 * 
 * 
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
 *         email: "pedro@gmail.com"
 *         password: "cuatrocincoseis"
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
 *         description: Error adding new USER
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
 *         description: Error when LOGGING IN USER
 */
route.post("/user/auth", userCtrl.logCtrl);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all USERS
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: Error when fetching USERS
 */
route.get("/user", userCtrl.getUsers);


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     summary: Get the USER selected if registered.
 *     tags: [USER]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: USER fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       404:
 *         description: USER not found 
 *       500:
 *         description: Error fetching USER
 */
route.get("/user/:uuid", validateToken, userCtrl.getUser);


/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     security: 
 *      - bearerAuth: []
 *     summary: Update the USER selected if registered.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The USER's id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error when updating USER
 *       404:
 *         description: USER not found
 */
route.patch("/user/:uuid", validateToken, userCtrl.updateUser);


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     security: 
 *      - bearerAuth: []
 *     summary: Delete the USER selected if registered.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The USER's id.
 *     responses:
 *       200:
 *         description: Success
 *        
 *       500:
 *         description: Error when deleting USER
 */
route.delete("/user/:uuid", validateToken, userCtrl.deleteUser);

export default route;

import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./user/infrastructure/database/mysql";
import userRoute from "../src/user/infrastructure/route/user.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors);
app.use(express.json());
app.use(userRoute);

dbConnection();
app.listen(PORT, () => console.log("Server running."));

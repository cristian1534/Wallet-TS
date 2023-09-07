import "dotenv/config";
import express from "express";
import cors from "cors";
import { dbConnection } from "./user/infrastructure/database/mysql";
import userRoute from "./user/infrastructure/routes/user.route";
import cardRoute from "./user/infrastructure/routes/card.route";
import transactionRoute from "./user/infrastructure/routes/transaction.route";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./user/infrastructure/documentation/swagger.options";

const app = express();
const PORT = process.env.PORT || 5000;
const specs = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/", userRoute);
app.use("/", cardRoute);
app.use("/", transactionRoute);

dbConnection();
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  console.log(`Documentation running on: http://localhost:${PORT}/api/v1/docs`);
});

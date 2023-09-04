import "dotenv/config";

const nodeEnv = process.env.NODE_ENV;
const swaggerPath =
  nodeEnv === "production"
    ? process.env.SWAGGER_PATH_PROD
    : __dirname + process.env.SWAGGER_PATH_DEV;

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wallet-TS",
      version: "1.0.0",
      description: "REST API NodeJS - TS Hexagonal Structure.",
      contact: {
        name: "Cristian Machuca",
        url: "http://www.cristian-dev.tech",
        email: "cmachuca32@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.PORT || "http://localhost:5000",
        description: "Backend NodeJS - TS Hexagonal Structure.",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`${swaggerPath}`],
};

import express from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";

export const app = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

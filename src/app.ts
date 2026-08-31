import express, {
    Request,
    Response
} from "express";

import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";

export const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(cors());

app.use(express.json());

app.get(
    "/api-docs.json",
    (
        req: Request,
        res: Response
    ): void => {

        res.status(200).json(
            swaggerSpec
        );
    }
);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Verify API status
 *     description: Verifies that the RiwiMediCare Plus API is running.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API running successfully
 *         content:
 *           application/json:
 *             example:
 *               message: API is working
 */
app.get(
    "/api/health",
    (
        req: Request,
        res: Response
    ): void => {

        res.status(200).json({
            message: "API is working"
        });
    }
);
// Imports Express and the request and response types
// used to configure the main application.
import express, { Request, Response} from "express";

// Imports CORS middleware to allow requests
// from external origins.
import cors from "cors";

// Imports Helmet middleware to add
// common HTTP security headers.
import helmet from "helmet";

// Imports Swagger UI middleware used
// to expose interactive API documentation.
import swaggerUi from "swagger-ui-express";

// Imports the generated Swagger/OpenAPI specification.
import { swaggerSpec} from "./config/swagger";

// Imports the authentication routes.
import { authRouter} from "./routes/auth.routes";

// Imports the clinic routes.
import { clinicRouter} from "./routes/clinic.routes";

// Imports the warehouse routes.
import warehouseRouter from "./routes/warehouse.routes";

// Imports the medication routes.
import { medicationRouter } from "./routes/medication.routes";

// Imports the inventory routes.
import { inventoryRouter } from "./routes/inventory.routes";

// Imports the JSON seed upload routes.
import { seedRouter } from "./routes/seed.routes";

// Imports the global application error middleware.
import {  errorMiddleware} from "./middlewares/error.middleware";

// Imports the supply request routes.
import { supplyRequestRouter } from "./routes/supply-request.routes";


/**
 * Main Express application instance.
 *
 * This instance configures global middleware,
 * API documentation, health verification,
 * application routes, and error handling.
 */
export const app = express();


/**
 * Adds security-related HTTP headers.
 *
 * Content Security Policy is disabled to avoid
 * conflicts with the Swagger UI interface.
 */
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

/**
 * Enables Cross-Origin Resource Sharing
 * for incoming HTTP requests.
 */
app.use(cors());

/**
 * Enables automatic parsing of JSON
 * request bodies.
 */
app.use(express.json());


/**
 * Exposes the generated OpenAPI specification
 * as a JSON document.
 */
app.get( "/api-docs.json", (_req: Request,res: Response ): void => {

        // Returns the complete Swagger specification.
        res.status(200).json(
            swaggerSpec
        );
    }
);


/**
 * Exposes the interactive Swagger UI
 * documentation interface.
 */
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


/**
 * @swagger
 * /api/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Verify API status
 *     responses:
 *       200:
 *         description: API is running successfully
 */
app.get( "/api/health", (_req: Request, res: Response): void => {

        // Returns a simple response confirming
        // that the API is currently running.
        res.status(200).json({
            message: "API is working"
        });
    }
);

/**
 * Mounts authentication routes.
 */
app.use(
    "/api/auth",
    authRouter
);

/**
 * Mounts authentication routes.
 */
app.use(
    "/api/auth",
    authRouter
);

/**
 * Mounts clinic management routes.
 */
app.use(
    "/api/clinics",
    clinicRouter
);

/**
 * Mounts clinic management routes.
 */
app.use(
    "/api/clinics",
    clinicRouter
);

/**
 * Mounts warehouse management routes.
 */
app.use(
    "/api/warehouses",
    warehouseRouter
);

/**
 * Mounts medication management routes.
 */
app.use(
    "/api/medications",
    medicationRouter
);

/**
 * Mounts inventory management routes.
 */
app.use(
    "/api/inventory",
    inventoryRouter
);

/**
 * Mounts medication supply request routes.
 */
app.use(
    "/api/supply-request",
    supplyRequestRouter
);

/**
 * Mounts the JSON seed upload routes.
 */
app.use(
    "/api/seed",
    seedRouter
);

/*
|--------------------------------------------------------------------------
| ERROR HANDLER - ALWAYS LAST
|--------------------------------------------------------------------------
*/

/**
 * Registers the global error middleware.
 *
 * This middleware must remain after all routes
 * so it can handle errors generated during
 * request processing.
 */
app.use(
    errorMiddleware
);
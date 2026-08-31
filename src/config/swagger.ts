// Imports Node.js path utilities used to build
// absolute file paths in a platform-independent way.
import path from "path";

// Imports swagger-jsdoc, which generates the OpenAPI
// specification from Swagger JSDoc comments.
import swaggerJsdoc from "swagger-jsdoc";

/**
 * Resolves the absolute path to the main Express
 * application file.
 *
 * Backslashes are replaced with forward slashes
 * to avoid path issues on Windows when Swagger
 * scans TypeScript files.
 */
const appPath = path
    .resolve(
        process.cwd(),
        "src/app.ts"
    )
    .replace(/\\/g, "/");

/**
 * Resolves the absolute path pattern for all route
 * files located inside the `src/routes` directory.
 *
 * The wildcard allows swagger-jsdoc to scan every
 * TypeScript route file for Swagger annotations.
 */
const routersPath = path
    .resolve(
        process.cwd(),
        "src/routes/*.ts"
    )
    .replace(/\\/g, "/");

/**
 * Swagger/OpenAPI configuration.
 *
 * Defines the API metadata, development server,
 * JWT authentication scheme, and the source files
 * that swagger-jsdoc must scan for documentation.
 */
const options: swaggerJsdoc.Options = {

    /**
     * Main OpenAPI specification.
     */
    definition: {

        // OpenAPI specification version.
        openapi: "3.0.0",

        /**
         * General API information displayed
         * in Swagger UI.
         */
        info: {
            title: "RiwiMediCare Plus API",
            version: "1.0.0",
            description:
                "REST API for managing medication supply requests"
        },

        /**
         * Servers where the API can be accessed.
         */
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        /**
         * Reusable OpenAPI components.
         */
        components: {

            /**
             * Defines JWT Bearer authentication.
             *
             * Protected endpoints can reference this
             * security scheme using `bearerAuth`.
             */
            securitySchemes: {

                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    /**
     * Files scanned by swagger-jsdoc.
     *
     * `app.ts` contains application-level documentation,
     * such as the health endpoint.
     *
     * Route files contain the Swagger documentation
     * for the API endpoints.
     */
    apis: [
        appPath,
        routersPath
    ]
};

/**
 * Generated OpenAPI specification.
 *
 * This object is later provided to Swagger UI
 * to render the interactive API documentation.
 */
export const swaggerSpec =
    swaggerJsdoc(options);
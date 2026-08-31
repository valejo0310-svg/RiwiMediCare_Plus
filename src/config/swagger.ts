import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "RiwiMediCare Plus API",
            version: "1.0.0",
            description:
                "API REST para la gestión de solicitudes de abastecimiento de medicamentos"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        path.join(
            process.cwd(),
            "src/**/*.ts"
        )
    ]
};

export const swaggerSpec =
    swaggerJsdoc(options);
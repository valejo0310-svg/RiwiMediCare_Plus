import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "RiwiMediCare Plus API",
            version: "1.0.0",
            description:
                "API REST for the management of medication supply requests"
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {
                CreateSupplyRequest: {
                    type: "object",
                    required: [
                        "clinicId",
                        "medicationId",
                        "warehouseId",
                        "quantity"
                    ],

                    properties: {
                        clinicId: {
                            type: "integer",
                            example: 1
                        },

                        medicationId: {
                            type: "integer",
                            example: 1
                        },

                        warehouseId: {
                            type: "integer",
                            example: 1
                        },

                        quantity: {
                            type: "integer",
                            example: 10
                        }
                    }
                },

                UpdateRequestStatus: {
                    type: "object",
                    required: ["status"],

                    properties: {
                        status: {
                            type: "string",
                            enum: [
                                "PENDING",
                                "APPROVED",
                                "REJECTED",
                                "DISPATCHED",
                                "COMPLETED"
                            ],
                            example: "APPROVED"
                        }
                    }
                }
            }
        }
    },

    apis: [
        path.join(
            process.cwd(),
            "src/routers/*.ts"
        )
    ]
};

export const swaggerSpec =
    swaggerJsdoc(options);
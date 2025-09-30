import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.4",
        info: {
            title: "Kapee Ecommerce API",
            version: "1.0.0",
            description: "API documentation for Kapee Ecommerce Backend",
        },
        servers: [
            { url: "http://localhost:5000/api_v1" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [
        "./src/routes/*.ts",
        "./src/controllers/*.ts",
        "./src/models/*.ts"
    ],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiHandler = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.4",
        info: {
            title: "Kapee Ecommerce API",
            version: "1.0.0",
            description: "API documentation for Kapee Ecommerce Backend",
            contact: {
                name: "Mugabe Nshuti Ignace",
                email: "i08690199@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:5000/api_v1",
                description: "Development server"
            },
            {
                url: "https://kapee-ecommerce-backend.onrender.com/api_v1",
                description: "Production server"
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
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [
        "./src/routes/*.ts",
    ],
};

export const swaggerSpec = swaggerJSDoc(options);


export const swaggerUiHandler = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
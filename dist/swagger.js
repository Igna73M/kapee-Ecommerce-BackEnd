"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiSetup = exports.swaggerUiHandler = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerUiHandler = swagger_ui_express_1.default.serve;
exports.swaggerUiSetup = swagger_ui_express_1.default.setup(exports.swaggerSpec);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ts_dotenv_1 = require("ts-dotenv");
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const indexRouters_1 = __importDefault(require("./routes/indexRouters"));
const swagger_1 = require("./swagger");
const env = (0, ts_dotenv_1.load)({
    DB_PORT: Number,
    DB_USER: String,
    DB_PASSWORD: String,
    MONGO_DB_URI: String,
    DB_NAME: String,
});
const port = env.DB_PORT || 7000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigin = "http://localhost:8080";
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true
}));
// Swagger docs
app.use("/api-docs", swagger_1.swaggerUiHandler, swagger_1.swaggerUiSetup);
// api_v1 routes
app.use('/api_v1', indexRouters_1.default);
(0, database_1.connectDB)();
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

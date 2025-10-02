import express from "express";
import { load } from "ts-dotenv";
import { connectDB } from "./config/database"
import cors from "cors";
import indexRouters from './routes/indexRouters';
import { swaggerUiHandler, swaggerUiSetup } from "./swagger";

const env = load({
    DB_PORT: Number,
    DB_USER: String,
    DB_PASSWORD: String,
    MONGO_DB_URI: String,
    DB_NAME: String,
});

const port = env.DB_PORT || 7000;

const app = express();
app.use(express.json());


const corsOptions = {
    origin: [
        "http://localhost:8080",              // local dev frontend
        "https://kapee-ecommerce.vercel.app", // deployed frontend
        "https://kapee-ecommerce-backend.onrender.com", // backend itself (Swagger, tests)
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));


// Swagger docs
app.use("/api-docs", swaggerUiHandler, swaggerUiSetup);

// api_v1 routes
app.use('/api_v1', indexRouters);

connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
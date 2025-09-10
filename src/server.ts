
import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { load } from "ts-dotenv"; // import dotenv from "dotenv";

import productRoutes from '../routes/productRoutes';
import bannerRoutes from '../routes/bannerRoutes';
import blogPostRoutes from '../routes/blogPostRoutes';
import brandCategoryRoutes from '../routes/brandCategoryRoutes';
import heroSlideRoutes from '../routes/heroSlideRoutes';
import serviceRoutes from '../routes/serviceRoutes';
import cartRoutes from '../routes/cartRoutes';

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

// API routes
app.use('/api/products', productRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/brand-categories', brandCategoryRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/carts', cartRoutes);


// API index route
app.get("/api", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to the E-commerce API. Available endpoints:",
        endpoints: [
            { path: "/api/products", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Product CRUD operations" },
            { path: "/api/banners", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Banner CRUD operations" },
            { path: "/api/blog-posts", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Blog post CRUD operations" },
            { path: "/api/brand-categories", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Brand category CRUD operations" },
            { path: "/api/hero-slides", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Hero slide CRUD operations" },
            { path: "/api/services", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Service CRUD operations" },
            { path: "/api/carts", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Cart CRUD operations" },
        ]
    });
});


const connectDB = async () => {

    try {
        const mongo_db_uri = env.MONGO_DB_URI || "";

        if (mongo_db_uri === "") {
            console.error("MongoDB URI is not defined");
            process.exit(1);
        }

        await mongoose.connect(mongo_db_uri);
        console.log("MongoDB connected");

    } catch (error) {

        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

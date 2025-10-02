"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const bannerRoutes_1 = __importDefault(require("./bannerRoutes"));
const blogPostRoutes_1 = __importDefault(require("./blogPostRoutes"));
const brandCategoryRoutes_1 = __importDefault(require("./brandCategoryRoutes"));
const heroSlideRoutes_1 = __importDefault(require("./heroSlideRoutes"));
const serviceRoutes_1 = __importDefault(require("./serviceRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const userRouter_1 = __importDefault(require("./userRouter"));
const wishlistRoutes_1 = __importDefault(require("./wishlistRoutes"));
const contactRoutes_1 = __importDefault(require("./contactRoutes"));
const router = (0, express_1.Router)();
router.use('/products', productRoutes_1.default);
router.use('/banners', bannerRoutes_1.default);
router.use('/blog-posts', blogPostRoutes_1.default);
router.use('/brand-categories', brandCategoryRoutes_1.default);
router.use('/hero-slides', heroSlideRoutes_1.default);
router.use('/services', serviceRoutes_1.default);
router.use('/carts', cartRoutes_1.default);
router.use('/orders', orderRoutes_1.default);
router.use('/user', userRouter_1.default);
router.use('/wishlist', wishlistRoutes_1.default);
router.use('/support', contactRoutes_1.default);
// api_v1 index route
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the E-commerce api_v1. Available endpoints:",
        endpoints: [
            { path: "/api_v1/products", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Product CRUD operations" },
            { path: "/api_v1/banners", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Banner CRUD operations" },
            { path: "/api_v1/blog-posts", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Blog post CRUD operations" },
            { path: "/api_v1/brand-categories", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Brand category CRUD operations" },
            { path: "/api_v1/hero-slides", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Hero slide CRUD operations" },
            { path: "/api_v1/services", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Service CRUD operations" },
            { path: "/api_v1/carts", methods: ["GET", "POST", "PATCH", "DELETE"], description: "Cart CRUD operations" },
        ]
    });
});
exports.default = router;

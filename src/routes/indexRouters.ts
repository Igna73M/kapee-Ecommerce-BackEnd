import { Router, Request, Response } from 'express';
import productRoutes from './productRoutes';
import bannerRoutes from './bannerRoutes';
import blogPostRoutes from './blogPostRoutes';
import brandCategoryRoutes from './brandCategoryRoutes';
import heroSlideRoutes from './heroSlideRoutes';
import serviceRoutes from './serviceRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import userRoutes from './userRouter';
import wishlistRoutes from './wishlistRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/banners', bannerRoutes);
router.use('/blog-posts', blogPostRoutes);
router.use('/brand-categories', brandCategoryRoutes);
router.use('/hero-slides', heroSlideRoutes);
router.use('/services', serviceRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/user', userRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/support', contactRoutes);

// api_v1 index route
router.get('/', (req: Request, res: Response) => {
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



export default router;

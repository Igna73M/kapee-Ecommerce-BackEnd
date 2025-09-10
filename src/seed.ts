import mongoose from 'mongoose';
import { load } from 'ts-dotenv';
import { ProductModel } from '../models/product';
import { BannerModel } from '../models/banner';
import { BlogPostModel } from '../models/blogPost';
import { BrandCategoryModel } from '../models/brandCategory';
import { HeroSlideModel } from '../models/heroSlide';
import { ServiceModel } from '../models/service';
import { CartModel } from '../models/cart';

import { products as rawProducts } from '../data/products';
import { banners as rawBanners } from '../data/banners';
import { blogPosts as rawBlogPosts } from '../data/blogPosts';
import { brandCategories as rawBrandCategories } from '../data/brandCategories';
import { heroSlides as rawHeroSlides } from '../data/heroSlides';
import { services as rawServices } from '../data/services';

import { carts as rawCarts } from '../data/carts';

// Helper to map productId (by name) to ObjectId after products are inserted
async function buildCartsWithProductRefs(products: any[], rawCarts: any[]) {
    // Build a map from product name to _id
    const nameToId: Record<string, any> = {};
    for (const p of products) {
        nameToId[p.name] = p._id;
    }
    return rawCarts.map((cart: any) => {
        const items = cart.items.map((item: any) => {
            // Find product by name (from seed data)
            const productId = nameToId[item.name];
            return {
                product: productId,
                price: item.price,
                quantity: item.quantity
            };
        });
        const total = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
        return {
            userId: cart.userId,
            items,
            total
        };
    });
}

// Helper: convert image/icon fields to string (for DB)
function serializeImage(val: any): string {
    if (typeof val === 'string') return val;
    if (val && val.src) return val.src;
    return '';
}

const products = rawProducts.map((p: any) => ({
    ...p,
    image: serializeImage(p.image),
    features: p.features || [],
    rating: p.rating || 0,
    inStock: p.inStock !== undefined ? p.inStock : true,
    // Remove id for MongoDB auto _id
    id: undefined
}));

const banners = rawBanners.map((b: any) => ({
    ...b,
    image: serializeImage(b.image),
    id: undefined
}));

const blogPosts = rawBlogPosts.map((b: any) => ({
    ...b,
    id: undefined
}));

const brandCategories = rawBrandCategories.map((b: any) => ({
    ...b
}));

const heroSlides = rawHeroSlides.map((h: any) => ({
    ...h,
    image: serializeImage(h.image),
    id: undefined
}));

const services = rawServices.map((s: any) => ({
    ...s,
    icon: typeof s.icon === 'string' ? s.icon : (s.icon && s.icon.name ? s.icon.name : ''),
}));

const env = load({
    MONGO_DB_URI: String,
});

async function seed() {
    try {
        await mongoose.connect(env.MONGO_DB_URI || '');
        console.log('Connected to MongoDB');

        // Clear existing data

        await Promise.all([
            ProductModel.deleteMany({}),
            BannerModel.deleteMany({}),
            BlogPostModel.deleteMany({}),
            BrandCategoryModel.deleteMany({}),
            HeroSlideModel.deleteMany({}),
            ServiceModel.deleteMany({}),
            CartModel.deleteMany({}),
        ]);

        // Insert new data


        // Insert products first to get their _ids
        const insertedProducts = await ProductModel.insertMany(products);
        await BannerModel.insertMany(banners);
        await BlogPostModel.insertMany(blogPosts);
        await BrandCategoryModel.insertMany(brandCategories);
        await HeroSlideModel.insertMany(heroSlides);
        await ServiceModel.insertMany(services);

        // Build carts with correct product ObjectIds and total
        const cartsToInsert = await buildCartsWithProductRefs(insertedProducts, rawCarts);
        await CartModel.insertMany(cartsToInsert);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();

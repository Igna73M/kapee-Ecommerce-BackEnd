import { Request, Response } from 'express';

import mongoose from 'mongoose';

import { ProductModel } from '../models/product';
import { BrandCategoryModel } from '../models/brandCategory';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            quantity,
            name,
            description,
            price,
            originalPrice,
            discount,
            image,
            category,
            features,
            rating,
            inStock
        } = req.body;

        let categoryId = category;

        // If category is a valid ObjectId, check if it exists
        if (mongoose.Types.ObjectId.isValid(categoryId)) {
            const categoryDoc = await BrandCategoryModel.findById(categoryId);
            if (!categoryDoc) {
                return res.status(400).json({ message: 'Category ID does not exist.' });
            }
            categoryId = categoryDoc._id;
        } else if (typeof categoryId === 'string') {
            // If category is a string (name), find or create the category
            let categoryDoc = await BrandCategoryModel.findOne({ name: categoryId });
            if (!categoryDoc) {
                categoryDoc = new BrandCategoryModel({
                    name: categoryId,
                    tagline: 'Default tagline',
                    initial: categoryId[0] || 'D',
                    bgColor: '#FFFFFF'
                });
                await categoryDoc.save();
            }
            categoryId = categoryDoc._id;
        } else {
            return res.status(400).json({ message: 'Invalid category value.' });
        }

        const product = new ProductModel({
            quantity,
            name,
            description,
            price,
            originalPrice,
            discount,
            image,
            category: categoryId,
            features,
            rating,
            inStock
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product', error: err });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product', error: err });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting product', error: err });
    }
};

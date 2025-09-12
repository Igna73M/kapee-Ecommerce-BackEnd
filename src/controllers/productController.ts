import { Request, Response } from 'express';

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
        let categoryId = req.body.category;
        // If category is a string (name), find or create the category
        if (typeof categoryId === 'string') {
            let category = await BrandCategoryModel.findOne({ name: categoryId });
            if (!category) {
                // Create new category with just the name, you may want to add more fields
                category = new BrandCategoryModel({ name: categoryId, tagline: '', initial: '', bgColor: '' });
                await category.save();
            }
            categoryId = category._id;
        }
        const product = new ProductModel({ ...req.body, category: categoryId });
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

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { ProductModel } from '../models/product';
import { BrandCategoryModel } from '../models/brandCategory';
import cloudinary from '../utils/cloudhandle';

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
        // Parse features as array if sent as string or array
        let features = req.body.features;
        if (typeof features === 'string') {
            features = [features];
        }

        // Only accept image file upload, not image url
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        } else {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        let categoryId = req.body.category;

        // If category is a valid ObjectId, check if it exists
        if (mongoose.Types.ObjectId.isValid(categoryId)) {
            const categoryDoc = await BrandCategoryModel.findById(categoryId);
            if (!categoryDoc) {
                return res.status(400).json({ message: 'Category ID does not exist.' });
            }
            categoryId = categoryDoc._id;
        } else {
            return res.status(400).json({ message: 'Invalid category value.' });
        }

        const product = new ProductModel({
            quantity: req.body.quantity,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            originalPrice: req.body.originalPrice,
            discount: req.body.discount,
            image: imageUrl,
            category: categoryId,
            features,
            rating: req.body.rating,
            inStock: req.body.inStock
        });

        await product.save();
        res.status(201).json(product);
    } catch (err: any) {
        console.error('Error creating product:', err);
        res.status(400).json({ message: 'Error creating product', error: err.message || err.toString() || err });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        let updateData = { ...req.body };

        // Parse features as array if sent as string or array
        if (updateData.features && typeof updateData.features === 'string') {
            updateData.features = [updateData.features];
        }

        // If a new file is uploaded, upload to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'products',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }

        const product = await ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err: any) {
        console.error('Error updating product:', err);
        res.status(400).json({ message: 'Error updating product', error: err.message || err.toString() || err });
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
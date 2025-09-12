import { Request, Response } from 'express';
import { BrandCategoryModel } from '../models/brandCategory';
import { ProductModel } from '../models/product';

// Get all brand categories
export const getBrandCategories = async (req: Request, res: Response) => {
    try {
        const categories = await BrandCategoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get a brand category by name
export const getBrandCategoryByName = async (req: Request, res: Response) => {
    try {
        const category = await BrandCategoryModel.findOne({ name: req.params.name });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Create a new brand category
export const createBrandCategory = async (req: Request, res: Response) => {
    try {
        const category = new BrandCategoryModel(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error creating brand category', error: err });
    }
};

// Update a brand category by name
export const updateBrandCategory = async (req: Request, res: Response) => {
    try {
        const category = await BrandCategoryModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error updating brand category', error: err });
    }
};

// Delete a brand category only if no products reference it
export const deleteBrandCategory = async (req: Request, res: Response) => {
    try {
        // Find the category by name
        const category = await BrandCategoryModel.findOne({ name: req.params.name });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });

        // Check if any products reference this category
        const productCount = await ProductModel.countDocuments({ category: category._id });
        if (productCount > 0) {
            return res.status(400).json({ message: 'Cannot delete category: products reference this category.' });
        }

        // Safe to delete
        await BrandCategoryModel.deleteOne({ _id: category._id });
        res.json({ message: 'Brand category deleted', category });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting brand category', error: err });
    }
};

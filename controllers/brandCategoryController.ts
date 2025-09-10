import { Request, Response } from 'express';
import { BrandCategoryModel } from '../models/brandCategory';

export const getBrandCategories = async (req: Request, res: Response) => {
    try {
        const categories = await BrandCategoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getBrandCategoryByName = async (req: Request, res: Response) => {
    try {
        const category = await BrandCategoryModel.findOne({ name: req.params.name });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createBrandCategory = async (req: Request, res: Response) => {
    try {
        const category = new BrandCategoryModel(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error creating brand category', error: err });
    }
};

export const updateBrandCategory = async (req: Request, res: Response) => {
    try {
        const category = await BrandCategoryModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error updating brand category', error: err });
    }
};

export const deleteBrandCategory = async (req: Request, res: Response) => {
    try {
        const category = await BrandCategoryModel.findOneAndDelete({ name: req.params.name });
        if (!category) return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting brand category', error: err });
    }
};

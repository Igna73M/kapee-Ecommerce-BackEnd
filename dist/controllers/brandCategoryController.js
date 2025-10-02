"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandCategory = exports.updateBrandCategory = exports.createBrandCategory = exports.getBrandCategoryById = exports.getBrandCategories = void 0;
const brandCategory_1 = require("../models/brandCategory");
const product_1 = require("../models/product");
// Get all brand categories
const getBrandCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield brandCategory_1.BrandCategoryModel.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBrandCategories = getBrandCategories;
// Get a brand category by id
const getBrandCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield brandCategory_1.BrandCategoryModel.findById(req.params.id);
        if (!category)
            return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBrandCategoryById = getBrandCategoryById;
// Create a new brand category
const createBrandCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new brandCategory_1.BrandCategoryModel(req.body);
        yield category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating brand category', error: err });
    }
});
exports.createBrandCategory = createBrandCategory;
// Update a brand category by id
const updateBrandCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield brandCategory_1.BrandCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category)
            return res.status(404).json({ message: 'Brand category not found' });
        res.json(category);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating brand category', error: err });
    }
});
exports.updateBrandCategory = updateBrandCategory;
// Delete a brand category only if no products reference it
const deleteBrandCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the category by id
        const category = yield brandCategory_1.BrandCategoryModel.findById(req.params.id);
        if (!category)
            return res.status(404).json({ message: 'Brand category not found' });
        // Check if any products reference this category
        const productCount = yield product_1.ProductModel.countDocuments({ category: category._id });
        if (productCount > 0) {
            return res.status(400).json({ message: 'Cannot delete category: products reference this category.' });
        }
        // Safe to delete
        yield brandCategory_1.BrandCategoryModel.deleteOne({ _id: category._id });
        res.json({ message: 'Brand category deleted', category });
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting brand category', error: err });
    }
});
exports.deleteBrandCategory = deleteBrandCategory;

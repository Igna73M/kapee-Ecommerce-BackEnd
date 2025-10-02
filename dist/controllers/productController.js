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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const product_1 = require("../models/product");
const brandCategory_1 = require("../models/brandCategory");
const cloudhandle_1 = __importDefault(require("../utils/cloudhandle"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.ProductModel.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.ProductModel.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse features as array if sent as string or array
        let features = req.body.features;
        if (typeof features === 'string') {
            features = [features];
        }
        // Only accept image file upload, not image url
        let imageUrl = '';
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'products',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        else {
            return res.status(400).json({ message: 'Image file is required.' });
        }
        let categoryId = req.body.category;
        // If category is a valid ObjectId, check if it exists
        if (mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            const categoryDoc = yield brandCategory_1.BrandCategoryModel.findById(categoryId);
            if (!categoryDoc) {
                return res.status(400).json({ message: 'Category ID does not exist.' });
            }
            categoryId = categoryDoc._id;
        }
        else {
            return res.status(400).json({ message: 'Invalid category value.' });
        }
        const product = new product_1.ProductModel({
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
        yield product.save();
        res.status(201).json(product);
    }
    catch (err) {
        console.error('Error creating product:', err);
        res.status(400).json({ message: 'Error creating product', error: err.message || err.toString() || err });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = Object.assign({}, req.body);
        // Parse features as array if sent as string or array
        if (updateData.features && typeof updateData.features === 'string') {
            updateData.features = [updateData.features];
        }
        // If a new file is uploaded, upload to Cloudinary
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'products',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const product = yield product_1.ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        console.error('Error updating product:', err);
        res.status(400).json({ message: 'Error updating product', error: err.message || err.toString() || err });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.ProductModel.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting product', error: err });
    }
});
exports.deleteProduct = deleteProduct;

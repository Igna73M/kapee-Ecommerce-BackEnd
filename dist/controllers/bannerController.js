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
exports.deleteBanner = exports.updateBanner = exports.createBanner = exports.getBannerById = exports.getBanners = void 0;
const banner_1 = require("../models/banner");
const cloudhandle_1 = __importDefault(require("../utils/cloudhandle"));
const fs_1 = __importDefault(require("fs"));
const getBanners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = yield banner_1.BannerModel.find();
        res.json(banners);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBanners = getBanners;
const getBannerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield banner_1.BannerModel.findById(req.params.id);
        if (!banner)
            return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBannerById = getBannerById;
const createBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = req.body.image;
        // Upload image to Cloudinary if file is present
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'banner',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const { title, subtitle, discount, buttonText } = req.body;
        const banner = new banner_1.BannerModel({
            title,
            subtitle,
            discount,
            image: imageUrl,
            buttonText
        });
        yield banner.save();
        res.status(201).json(banner);
    }
    catch (err) {
        console.error('Error creating banner:', err);
        res.status(400).json({ message: 'Error creating banner', error: err.message || err.toString() || err });
    }
});
exports.createBanner = createBanner;
const updateBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = Object.assign({}, req.body);
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'banner',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const banner = yield banner_1.BannerModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!banner)
            return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    }
    catch (err) {
        console.error('Error updating banner:', err);
        res.status(400).json({ message: 'Error updating banner', error: err.message || err.toString() || err });
    }
});
exports.updateBanner = updateBanner;
const deleteBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield banner_1.BannerModel.findByIdAndDelete(req.params.id);
        if (!banner)
            return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting banner', error: err });
    }
});
exports.deleteBanner = deleteBanner;

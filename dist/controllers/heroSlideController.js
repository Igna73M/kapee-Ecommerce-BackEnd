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
exports.deleteHeroSlide = exports.updateHeroSlide = exports.createHeroSlide = exports.getHeroSlideById = exports.getHeroSlides = void 0;
const heroSlide_1 = require("../models/heroSlide");
const cloudhandle_1 = __importDefault(require("../utils/cloudhandle"));
const fs_1 = __importDefault(require("fs"));
const getHeroSlides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const heroSlides = yield heroSlide_1.HeroSlideModel.find();
        res.json(heroSlides);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getHeroSlides = getHeroSlides;
const getHeroSlideById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slide = yield heroSlide_1.HeroSlideModel.findById(req.params.id);
        if (!slide)
            return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getHeroSlideById = getHeroSlideById;
const createHeroSlide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = req.body.image;
        // Upload image to Cloudinary if file is present
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'heroslide',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const { title, subtitle, highlight, discount, buttonText } = req.body;
        const heroSlide = new heroSlide_1.HeroSlideModel({
            title,
            subtitle,
            highlight,
            discount,
            image: imageUrl,
            buttonText
        });
        yield heroSlide.save();
        res.status(201).json(heroSlide);
    }
    catch (err) {
        console.error('Error creating hero slide:', err);
        res.status(400).json({ message: 'Error creating hero slide', error: err.message || err.toString() || err });
    }
});
exports.createHeroSlide = createHeroSlide;
const updateHeroSlide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = Object.assign({}, req.body);
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'heroslide',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const heroSlide = yield heroSlide_1.HeroSlideModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!heroSlide)
            return res.status(404).json({ message: 'Hero slide not found' });
        res.json(heroSlide);
    }
    catch (err) {
        console.error('Error updating hero slide:', err);
        res.status(400).json({ message: 'Error updating hero slide', error: err.message || err.toString() || err });
    }
});
exports.updateHeroSlide = updateHeroSlide;
const deleteHeroSlide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slide = yield heroSlide_1.HeroSlideModel.findByIdAndDelete(req.params.id);
        if (!slide)
            return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting hero slide', error: err });
    }
});
exports.deleteHeroSlide = deleteHeroSlide;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSlideModel = void 0;
const mongoose_1 = require("mongoose");
const HeroSlideSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    highlight: { type: String, required: true },
    discount: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
}, { timestamps: true });
exports.HeroSlideModel = (0, mongoose_1.model)('HeroSlide', HeroSlideSchema);

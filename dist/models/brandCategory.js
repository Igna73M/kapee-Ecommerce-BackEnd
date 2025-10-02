"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const BrandCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    initial: { type: String, required: true },
    bgColor: { type: String, required: true },
}, { timestamps: true });
exports.BrandCategoryModel = (0, mongoose_1.model)('BrandCategory', BrandCategorySchema);

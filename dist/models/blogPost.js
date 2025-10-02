"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostModel = void 0;
const mongoose_1 = require("mongoose");
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
}, { timestamps: true });
exports.BlogPostModel = (0, mongoose_1.model)('BlogPost', BlogPostSchema);

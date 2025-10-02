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
exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostById = exports.getBlogPosts = void 0;
const blogPost_1 = require("../models/blogPost");
const cloudhandle_1 = __importDefault(require("../utils/cloudhandle"));
const fs_1 = __importDefault(require("fs"));
// Get all blog posts
const getBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPosts = yield blogPost_1.BlogPostModel.find();
        res.json(blogPosts);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBlogPosts = getBlogPosts;
// Get a blog post by ID
const getBlogPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPost_1.BlogPostModel.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getBlogPostById = getBlogPostById;
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = req.body.image;
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'blog',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const { title, excerpt, date, body } = req.body;
        const blogPost = new blogPost_1.BlogPostModel({
            title,
            excerpt,
            date,
            image: imageUrl,
            body
        });
        yield blogPost.save();
        res.status(201).json(blogPost);
    }
    catch (err) {
        console.error('Error creating blog post:', err);
        res.status(400).json({ message: 'Error creating blog post', error: err.message || err.toString() || err });
    }
});
exports.createBlogPost = createBlogPost;
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = Object.assign({}, req.body);
        if (req.file) {
            const result = yield cloudhandle_1.default.uploader.upload(req.file.path, {
                folder: 'blog',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const blogPost = yield blogPost_1.BlogPostModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!blogPost)
            return res.status(404).json({ message: 'Blog post not found' });
        res.json(blogPost);
    }
    catch (err) {
        console.error('Error updating blog post:', err);
        res.status(400).json({ message: 'Error updating blog post', error: err.message || err.toString() || err });
    }
});
exports.updateBlogPost = updateBlogPost;
// Delete a blog post
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blogPost_1.BlogPostModel.findByIdAndDelete(req.params.id);
        if (!post)
            return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    }
    catch (err) {
        res.status(400).json({ message: 'Error deleting blog post', error: err });
    }
});
exports.deleteBlogPost = deleteBlogPost;

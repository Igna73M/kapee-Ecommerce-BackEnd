import { Request, Response } from 'express';
import { BlogPostModel } from '../models/blogPost';
import cloudinary from '../utils/cloudhandle';
import fs from 'fs';

// Get all blog posts
export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogPosts = await BlogPostModel.find();
        res.json(blogPosts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get a blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const post = await BlogPostModel.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const createBlogPost = async (req: Request, res: Response) => {
    try {
        let imageUrl = req.body.image;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blog',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        const { title, excerpt, date, body } = req.body;
        const blogPost = new BlogPostModel({
            title,
            excerpt,
            date,
            image: imageUrl,
            body
        });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (err: any) {
        console.error('Error creating blog post:', err);
        res.status(400).json({ message: 'Error creating blog post', error: err.message || err.toString() || err });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blog',
                resource_type: 'image'
            });
            updateData.image = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        const blogPost = await BlogPostModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
        res.json(blogPost);
    } catch (err: any) {
        console.error('Error updating blog post:', err);
        res.status(400).json({ message: 'Error updating blog post', error: err.message || err.toString() || err });
    }
};

// Delete a blog post
export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPostModel.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting blog post', error: err });
    }
};
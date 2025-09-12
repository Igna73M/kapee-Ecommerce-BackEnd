import { Request, Response } from 'express';
import { BlogPostModel } from '../models/blogPost';

export const getBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogPosts = await BlogPostModel.find();
        res.json(blogPosts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

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
        const post = new BlogPostModel(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: 'Error creating blog post', error: err });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: 'Error updating blog post', error: err });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        const post = await BlogPostModel.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: 'Error deleting blog post', error: err });
    }
};

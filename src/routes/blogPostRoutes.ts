import express from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blogPostController';

const router = express.Router();


router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', createBlogPost);
router.patch('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;

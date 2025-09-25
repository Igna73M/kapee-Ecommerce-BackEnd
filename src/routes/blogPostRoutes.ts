import express from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from "../controllers/blogPostController";
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', requireSignin, isAdmin, upload.single('image'), createBlogPost);
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateBlogPost);
router.delete('/:id', requireSignin, isAdmin, deleteBlogPost);

export default router;
import express from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from "../controllers/blogPostController";
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BlogPost
 *   description: Blog post management
 */

/**
 * @swagger
 * /blog-posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [BlogPost]
 *     responses:
 *       200:
 *         description: List of blog posts
 */
router.get('/', getBlogPosts);

/**
 * @swagger
 * /blog-posts/{id}:
 *   get:
 *     summary: Get blog post by ID
 *     tags: [BlogPost]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post details
 *       404:
 *         description: Blog post not found
 */
router.get('/:id', getBlogPostById);

/**
 * @swagger
 * /blog-posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [BlogPost]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               excerpt: { type: string }
 *               date: { type: string }
 *               body: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Blog post created
 *       400:
 *         description: Error creating blog post
 */
router.post('/', requireSignin, isAdmin, upload.single('image'), createBlogPost);

/**
 * @swagger
 * /blog-posts/{id}:
 *   patch:
 *     summary: Update a blog post
 *     tags: [BlogPost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               excerpt: { type: string }
 *               date: { type: string }
 *               body: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Blog post updated
 *       404:
 *         description: Blog post not found
 */
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateBlogPost);

/**
 * @swagger
 * /blog-posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [BlogPost]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted
 *       404:
 *         description: Blog post not found
 */
router.delete('/:id', requireSignin, isAdmin, deleteBlogPost);

export default router;
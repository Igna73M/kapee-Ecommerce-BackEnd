"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogPostController_1 = require("../controllers/blogPostController");
const authentication_1 = require("../middlewares/authentication");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
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
router.get('/', blogPostController_1.getBlogPosts);
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
router.get('/:id', blogPostController_1.getBlogPostById);
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
router.post('/', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), blogPostController_1.createBlogPost);
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
router.patch('/:id', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), blogPostController_1.updateBlogPost);
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
router.delete('/:id', authentication_1.requireSignin, authentication_1.isAdmin, blogPostController_1.deleteBlogPost);
exports.default = router;

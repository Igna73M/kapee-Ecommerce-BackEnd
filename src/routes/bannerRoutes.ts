import express from 'express';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController';
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banner
 *   description: Banner management
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: List of banners
 */
router.get('/', getBanners);

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner details
 *       404:
 *         description: Banner not found
 */
router.get('/:id', getBannerById);

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banner]
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
 *               subtitle: { type: string }
 *               discount: { type: string }
 *               buttonText: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Banner created
 *       400:
 *         description: Error creating banner
 */
router.post('/', requireSignin, isAdmin, upload.single('image'), createBanner);

/**
 * @swagger
 * /banners/{id}:
 *   patch:
 *     summary: Update a banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               discount: { type: string }
 *               buttonText: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Banner updated
 *       404:
 *         description: Banner not found
 */
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateBanner);

/**
 * @swagger
 * /banners/{id}:
 *   delete:
 *     summary: Delete a banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner deleted
 *       404:
 *         description: Banner not found
 */
router.delete('/:id', requireSignin, isAdmin, deleteBanner);

export default router;
import express from 'express';
import { getHeroSlides, getHeroSlideById, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../controllers/heroSlideController';
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HeroSlides
 *   description: Hero slide management
 */

/**
 * @swagger
 * /hero-slides:
 *   get:
 *     summary: Get all hero slides
 *     tags: [HeroSlides]
 *     responses:
 *       200:
 *         description: List of hero slides
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HeroSlide'
 */
router.get('/', getHeroSlides);

/**
 * @swagger
 * /hero-slides/{id}:
 *   get:
 *     summary: Get hero slide by ID
 *     tags: [HeroSlides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide ID
 *     responses:
 *       200:
 *         description: Hero slide details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HeroSlide'
 *       404:
 *         description: Hero slide not found
 */
router.get('/:id', getHeroSlideById);

/**
 * @swagger
 * /hero-slides:
 *   post:
 *     summary: Create a new hero slide
 *     tags: [HeroSlides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - image
 *     responses:
 *       201:
 *         description: Hero slide created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HeroSlide'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.post('/', requireSignin, isAdmin, upload.single('image'), createHeroSlide);

/**
 * @swagger
 * /hero-slides/{id}:
 *   patch:
 *     summary: Update a hero slide
 *     tags: [HeroSlides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Hero slide updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HeroSlide'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Hero slide not found
 */
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateHeroSlide);

/**
 * @swagger
 * /hero-slides/{id}:
 *   delete:
 *     summary: Delete a hero slide
 *     tags: [HeroSlides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide ID
 *     responses:
 *       200:
 *         description: Hero slide deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Hero slide not found
 */
router.delete('/:id', requireSignin, isAdmin, deleteHeroSlide);

export default router;
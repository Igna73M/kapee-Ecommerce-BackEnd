"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const heroSlideController_1 = require("../controllers/heroSlideController");
const authentication_1 = require("../middlewares/authentication");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
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
router.get('/', heroSlideController_1.getHeroSlides);
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
router.get('/:id', heroSlideController_1.getHeroSlideById);
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
router.post('/', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), heroSlideController_1.createHeroSlide);
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
router.patch('/:id', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), heroSlideController_1.updateHeroSlide);
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
router.delete('/:id', authentication_1.requireSignin, authentication_1.isAdmin, heroSlideController_1.deleteHeroSlide);
exports.default = router;

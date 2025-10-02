"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bannerController_1 = require("../controllers/bannerController");
const authentication_1 = require("../middlewares/authentication");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
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
router.get('/', bannerController_1.getBanners);
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
router.get('/:id', bannerController_1.getBannerById);
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
router.post('/', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), bannerController_1.createBanner);
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
router.patch('/:id', authentication_1.requireSignin, authentication_1.isAdmin, multer_1.default.single('image'), bannerController_1.updateBanner);
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
router.delete('/:id', authentication_1.requireSignin, authentication_1.isAdmin, bannerController_1.deleteBanner);
exports.default = router;

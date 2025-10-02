"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandCategoryController_1 = require("../controllers/brandCategoryController");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: BrandCategory
 *   description: Brand category management
 */
/**
 * @swagger
 * /brand-categories:
 *   get:
 *     summary: Get all brand categories
 *     tags: [BrandCategory]
 *     responses:
 *       200:
 *         description: List of brand categories
 */
router.get('/', brandCategoryController_1.getBrandCategories);
/**
 * @swagger
 * /brand-categories/{id}:
 *   get:
 *     summary: Get brand category by ID
 *     tags: [BrandCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand category ID
 *     responses:
 *       200:
 *         description: Brand category details
 *       404:
 *         description: Brand category not found
 */
router.get('/:id', brandCategoryController_1.getBrandCategoryById);
/**
 * @swagger
 * /brand-categories:
 *   post:
 *     summary: Create a new brand category
 *     tags: [BrandCategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               tagline: { type: string }
 *               initial: { type: string }
 *               bgColor: { type: string }
 *     responses:
 *       201:
 *         description: Brand category created
 *       400:
 *         description: Error creating brand category
 */
router.post('/', authentication_1.requireSignin, authentication_1.isAdmin, brandCategoryController_1.createBrandCategory);
/**
 * @swagger
 * /brand-categories/{id}:
 *   patch:
 *     summary: Update a brand category
 *     tags: [BrandCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               tagline: { type: string }
 *               initial: { type: string }
 *               bgColor: { type: string }
 *     responses:
 *       200:
 *         description: Brand category updated
 *       404:
 *         description: Brand category not found
 */
router.patch('/:id', authentication_1.requireSignin, authentication_1.isAdmin, brandCategoryController_1.updateBrandCategory);
/**
 * @swagger
 * /brand-categories/{id}:
 *   delete:
 *     summary: Delete a brand category
 *     tags: [BrandCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand category ID
 *     responses:
 *       200:
 *         description: Brand category deleted
 *       404:
 *         description: Brand category not found
 */
router.delete('/:id', authentication_1.requireSignin, authentication_1.isAdmin, brandCategoryController_1.deleteBrandCategory);
exports.default = router;

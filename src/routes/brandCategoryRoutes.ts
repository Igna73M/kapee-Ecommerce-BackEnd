import express from 'express';
import { getBrandCategories, getBrandCategoryById, createBrandCategory, updateBrandCategory, deleteBrandCategory } from '../controllers/brandCategoryController';
import { isAdmin, requireSignin } from '../middlewares/authentication';

const router = express.Router();


router.get('/', getBrandCategories);
router.get('/:id', getBrandCategoryById);
router.post('/', requireSignin, isAdmin, createBrandCategory);
router.patch('/:id', requireSignin, isAdmin, updateBrandCategory);
router.delete('/:id', requireSignin, isAdmin, deleteBrandCategory);

export default router;

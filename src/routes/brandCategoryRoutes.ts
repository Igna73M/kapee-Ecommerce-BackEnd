import express from 'express';
import { getBrandCategories, getBrandCategoryByName, createBrandCategory, updateBrandCategory, deleteBrandCategory } from '../controllers/brandCategoryController';

const router = express.Router();


router.get('/', getBrandCategories);
router.get('/:name', getBrandCategoryByName);
router.post('/', createBrandCategory);
router.patch('/:name', updateBrandCategory);
router.delete('/:name', deleteBrandCategory);

export default router;

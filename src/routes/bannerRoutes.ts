import express from 'express';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController';

const router = express.Router();


router.get('/', getBanners);
router.get('/:id', getBannerById);
router.post('/', createBanner);
router.patch('/:id', updateBanner);
router.delete('/:id', deleteBanner);

export default router;

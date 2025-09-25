import express from 'express';
import { getBanners, getBannerById, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController';
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', getBanners);
router.get('/:id', getBannerById);
router.post('/', requireSignin, isAdmin, upload.single('image'), createBanner);
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateBanner);
router.delete('/:id', requireSignin, isAdmin, deleteBanner);

export default router;
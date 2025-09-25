import express from 'express';
import { getHeroSlides, getHeroSlideById, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../controllers/heroSlideController';
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();

router.get('/', getHeroSlides);
router.get('/:id', getHeroSlideById);
router.post('/', requireSignin, isAdmin, upload.single('image'), createHeroSlide);
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateHeroSlide);
router.delete('/:id', requireSignin, isAdmin, deleteHeroSlide);

export default router;
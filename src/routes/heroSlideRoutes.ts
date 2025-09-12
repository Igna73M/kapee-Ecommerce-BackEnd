import express from 'express';
import { getHeroSlides, getHeroSlideById, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../controllers/heroSlideController';

const router = express.Router();


router.get('/', getHeroSlides);
router.get('/:id', getHeroSlideById);
router.post('/', createHeroSlide);
router.patch('/:id', updateHeroSlide);
router.delete('/:id', deleteHeroSlide);

export default router;

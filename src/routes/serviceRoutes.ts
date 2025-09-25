import express from 'express';
import { getServices, createService, updateService, deleteService, getServiceById } from '../controllers/serviceController';
import { isAdmin, requireSignin } from '../middlewares/authentication';

const router = express.Router();


router.get('/', getServices);
router.get('/:id', requireSignin, isAdmin, getServiceById);
router.post('/', requireSignin, isAdmin, createService);
router.patch('/:id', requireSignin, isAdmin, updateService);
router.delete('/:id', requireSignin, isAdmin, deleteService);

export default router;

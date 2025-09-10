import express from 'express';
import { getServices, getServiceByTitle, createService, updateService, deleteService } from '../controllers/serviceController';

const router = express.Router();


router.get('/', getServices);
router.get('/:title', getServiceByTitle);
router.post('/', createService);
router.patch('/:title', updateService);
router.delete('/:title', deleteService);

export default router;

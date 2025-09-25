import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { isAdmin, requireSignin } from '../middlewares/authentication';
import upload from '../utils/multer';

const router = express.Router();


// CRUD routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireSignin, isAdmin, upload.single('image'), createProduct);
router.patch('/:id', requireSignin, isAdmin, upload.single('image'), updateProduct);
router.delete('/:id', requireSignin, isAdmin, deleteProduct);

export default router;

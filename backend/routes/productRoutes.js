import express from 'express';
//initialize router
const router = express.Router();

import { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts, 
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

//all products to controller
router.route('/')
.get(getProducts)
.post(protect, admin, createProduct);

router.get('/top', getTopProducts);

//product by id to controller
router.route('/:id')
.get(checkObjectId, getProductById)
.put(protect, admin, checkObjectId, updateProduct)
.delete(protect, admin, checkObjectId, deleteProduct);

//
router.route('/:id/reviews')
.post(protect, checkObjectId, createProductReview);

//
router
.get('/top', getTopProducts);

export default router;
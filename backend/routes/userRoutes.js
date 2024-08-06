import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile) //protected
  .put(protect, updateUserProfile); //protected
router
  .route('/:id')
  .delete(protect, admin, deleteUser) //protected //admin
  .get(protect, admin, getUserById) //protected //admin
  .put(protect, admin, updateUser); //protected //admin

export default router;

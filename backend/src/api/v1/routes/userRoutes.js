import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const userController = new UserController();
const router = express.Router();

/**
 * @route GET /:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id', authenticateToken, userController.getUserById);

/**
 * @route PUT /:id
 * @desc Update user by ID
 * @access Private
 */
router.put('/:id', authenticateToken, userController.updateUser);

/**
 * @route DELETE /:id
 * @desc Delete user by ID
 * @access Private
 */
router.delete('/:id', authenticateToken, userController.deleteUser);

export default router;


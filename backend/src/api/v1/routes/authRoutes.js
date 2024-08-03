import express from 'express';
import AuthController from '../controllers/authController.js';

const authController = new AuthController();
const router = express.Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /login
 * @desc Login a user
 * @access Public
 */
router.post('/login', authController.login);

export default router;



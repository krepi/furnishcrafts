import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import {validateEmptyQueryParams} from "../middleware/paramsValidatorMiddleware.js";

const userController = new UserController();
const router = express.Router();

router.use(authenticateToken);

// Apply validateEmptyQueryParams middleware only to GET routes
router.get('*', validateEmptyQueryParams);
/**
 * @route GET /:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id',  userController.getUserById);

/**
 * @route PUT /:id
 * @desc Update user by ID
 * @access Private
 */
router.put('/:id', userController.updateUser);

/**
 * @route DELETE /:id
 * @desc Delete user by ID
 * @access Private
 */
router.delete('/:id',  userController.deleteUser);

export default router;


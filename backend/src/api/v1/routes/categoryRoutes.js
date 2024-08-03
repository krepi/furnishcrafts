import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();
const categoryController = new CategoryController();

/**
 * @route GET /api/v1/categories
 * @desc Get all categories
 * @access Public
 */
router.get('/', categoryController.getAllCategories);

export default router;

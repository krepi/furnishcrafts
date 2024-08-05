import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import {validateEmptyQueryParams} from "../middleware/paramsValidatorMiddleware.js";

const router = express.Router();
const categoryController = new CategoryController();

// Apply validateEmptyQueryParams middleware only to GET routes
router.get('*', validateEmptyQueryParams);
/**
 * @route GET /api/v1/categories
 * @desc Get all categories
 * @access Public
 */
router.get('/', categoryController.getAllCategories);

export default router;

import express from 'express';
import ElementController from '../controllers/elementController.js';
import {validateEmptyQueryParams, validateQueryParams} from "../middleware/paramsValidatorMiddleware.js";
import { ALLOWED_ELEMENTS_PARAMS } from "../constants/paramsConstants.js";

const router = express.Router();
const elementController = new ElementController();



/**
 * @route GET /api/v1/elements
 * @desc Get all elements
 * @access Public
 */
router.get('/', validateQueryParams(ALLOWED_ELEMENTS_PARAMS), elementController.getAllElements);

// Apply validateEmptyQueryParams middleware only to GET routes
router.get('*', validateEmptyQueryParams);

/**
 * @route GET /api/v1/elements/:id
 * @desc Get element details by ID
 * @access Public
 */
router.get('/:id', elementController.getElementById);

export default router;

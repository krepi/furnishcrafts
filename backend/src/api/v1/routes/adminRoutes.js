import express from "express";
import AdminController from "../controllers/adminController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import { validateEmptyQueryParams } from "../middleware/paramsValidatorMiddleware.js";

const router = express.Router();
const adminController = new AdminController();

// Apply middleware to all routes below
router.use(authenticateToken, authorizeRole('administrator'));

// Apply validateEmptyQueryParams middleware only to GET routes
router.get('*', validateEmptyQueryParams);
/**
 * @route GET /api/v1/admin/users
 * @desc Get all users
 * @access Private (Admin only)
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route POST /api/v1/admin/categories
 * @desc Add a new category
 * @access Private (Admin only)
 */
router.post('/categories', adminController.addCategory);

/**
 * @route GET /api/v1/admin/projects
 * @desc Get all projects
 * @access Private (Admin only)
 */
router.get('/projects', adminController.getAllProjects);

/**
 * @route POST /api/v1/admin/projects/:id/confirm
 * @desc Confirm a project and update stock
 * @access Private (Admin only)
 */
router.post('/projects/:id/confirm', adminController.confirmProject);

/**
 * @route POST /api/v1/admin/elements
 * @desc Add a new element
 * @access Private (Admin only)
 */
router.post('/elements', adminController.addElement);

/**
 * @route PUT /api/v1/admin/elements/:id
 * @desc Update an element
 * @access Private (Admin only)
 */
router.put('/elements/:id', adminController.updateElement);

/**
 * @route DELETE /api/v1/admin/elements/:id
 * @desc Delete an element
 * @access Private (Admin only)
 */
router.delete('/elements/:id', adminController.deleteElement);

export default router;

import express from "express";
import AdminController from "../controllers/adminController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();
const adminController = new AdminController();

/**
 * @route GET /api/v1/admin/users
 * @desc Get all users
 * @access Private (Admin only)
 */
router.get('/users', authenticateToken, authorizeRole('administrator'), adminController.getAllUsers);

/**
 * @route POST /api/v1/admin/categories
 * @desc Add a new category
 * @access Private (Admin only)
 */
router.post('/categories', authenticateToken, authorizeRole('administrator'), adminController.addCategory);

/**
 * @route GET /api/v1/admin/projects
 * @desc Get all projects
 * @access Private (Admin only)
 */
router.get('/projects', authenticateToken, authorizeRole('administrator'), adminController.getAllProjects);

/**
 * @route POST /api/v1/admin/projects/:id/confirm
 * @desc Confirm a project and update stock
 * @access Private (Admin only)
 */
router.post('/projects/:id/confirm', authenticateToken, authorizeRole('administrator'), adminController.confirmProject);

/**
 * @route POST /api/v1/admin/elements
 * @desc Add a new element
 * @access Private (Admin only)
 */
router.post('/elements', authenticateToken, authorizeRole('administrator'), adminController.addElement);

/**
 * @route PUT /api/v1/admin/elements/:id
 * @desc Update an element
 * @access Private (Admin only)
 */
router.put('/elements/:id', authenticateToken, authorizeRole('administrator'), adminController.updateElement);

/**
 * @route DELETE /api/v1/admin/elements/:id
 * @desc Delete an element
 * @access Private (Admin only)
 */
router.delete('/elements/:id', authenticateToken, authorizeRole('administrator'), adminController.deleteElement);

export default router;

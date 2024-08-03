import express from 'express';
import ProjectController from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const projectController = new ProjectController();

/**
 * @route GET /projects
 * @desc Get all projects for a user
 * @access Private
 */
router.get('/', authenticateToken, projectController.getProjects);

/**
 * @route POST /projects
 * @desc Create a new project
 * @access Private
 */
router.post('/', authenticateToken, projectController.createProject);

/**
 * @route GET /projects/:id
 * @desc Get project details by ID
 * @access Private
 */
router.get('/:id', authenticateToken, projectController.getProjectById);
/**
 * @route GET /projects/:id/details
 * @desc Get detailed project elements
 * @access Private
 */
router.get('/:id/details', authenticateToken, projectController.getProjectDetails);

/**
 * @route POST /projects/:projectId/elements
 * @desc Add element to project
 * @access Private
 */
router.post('/:projectId/elements', authenticateToken, projectController.addElementToProject);

/**
 * @route DELETE /projects/:projectId/elements/:elementId
 * @desc Remove element from project
 * @access Private
 */
router.delete('/:projectId/elements/:elementId', authenticateToken, projectController.removeElementQuantityFromProject);

/**
 * @route POST /projects/:projectId/close
 * @desc Close project and update stock
 * @access Private
 */
router.post('/:projectId/close', authenticateToken, projectController.closeProject);

export default router;

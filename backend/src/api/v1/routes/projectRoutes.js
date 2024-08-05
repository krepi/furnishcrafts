import express from 'express';
import ProjectController from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateEmptyQueryParams } from '../middleware/paramsValidatorMiddleware.js';

const router = express.Router();
const projectController = new ProjectController();

// Apply middleware to all routes below
router.use(authenticateToken);

// Apply validateEmptyQueryParams middleware only to GET routes
router.get('*', validateEmptyQueryParams);

/**
 * @route GET /projects
 * @desc Get all projects for a user
 * @access Private
 */
router.get('/', projectController.getProjects);

/**
 * @route POST /projects
 * @desc Create a new project
 * @access Private
 */
router.post('/', projectController.createProject);

/**
 * @route GET /projects/:id
 * @desc Get project details by ID
 * @access Private
 */
router.get('/:id', projectController.getProjectById);

/**
 * @route GET /projects/:id/details
 * @desc Get detailed project elements
 * @access Private
 */
router.get('/:id/details', projectController.getProjectDetails);

/**
 * @route POST /projects/:projectId/elements
 * @desc Add element to project
 * @access Private
 */
router.post('/:projectId/elements', projectController.addElementToProject);

/**
 * @route DELETE /projects/:projectId/elements/:elementId
 * @desc Remove element from project
 * @access Private
 */
router.delete('/:projectId/elements/:elementId', projectController.removeElementQuantityFromProject);

/**
 * @route POST /projects/:projectId/close
 * @desc Close project and update stock
 * @access Private
 */
router.post('/:projectId/close', projectController.closeProject);

export default router;

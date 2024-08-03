import userService from "../services/userService.js";
import categoryService from "../services/categoryService.js";
import projectService from "../services/projectService.js";
import elementService from "../services/elementService.js";

class AdminController {
    /**
     * Get all users
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Add a new category
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async addCategory(req, res) {
        try {
            const category = await categoryService.addCategory(req.body);
            res.status(200).send(category);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Get all projects
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async getAllProjects(req, res) {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Confirm a project and update stock
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async confirmProject(req, res) {
        try {
            const projectId = req.params.id;
            const { outOfStock } = await projectService.calculateProjectCostAndTime(projectId);

            if (outOfStock.length > 0) {
                return res.status(400).json({ message: 'Some elements are out of stock', outOfStock });
            }

            await projectService.updateProjectStock(projectId);
            res.status(200).json({ message: 'Project confirmed and stock updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Add a new element
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async addElement(req, res) {
        try {
            const element = await elementService.createElement(req.body);
            res.status(201).json(element);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Update an element
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async updateElement(req, res) {
        try {
            const { id } = req.params;
            const element = await elementService.updateElement(id, req.body);
            res.status(200).json(element);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Delete an element
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async deleteElement(req, res) {
        try {
            const { id } = req.params;
            await elementService.deleteElement(id);
            res.status(200).json({ message: 'Element deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AdminController;

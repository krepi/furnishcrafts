import elementService from '../services/elementService.js';

class ElementController {
    /**
     * Get all elements
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async getAllElements(req, res) {
        try {
            const filters = {
                categoryId: req.query.categoryId,
                colorId: req.query.colorId,
            };
            const elements = await elementService.getAllElements(filters);
            res.status(200).json(elements);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Get element details by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async getElementById(req, res) {
        try {
            const { id } = req.params;
            const element = await elementService.getElementById(parseInt(id, 10));
            res.status(200).json(element);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default ElementController;

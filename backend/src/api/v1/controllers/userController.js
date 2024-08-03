import userService from '../services/userService.js';

class UserController {
    /**
     * Get user by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(parseInt(id, 10));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Update user by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await userService.updateUser(parseInt(id, 10), userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Delete user by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await userService.deleteUser(parseInt(id, 10));
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default UserController;

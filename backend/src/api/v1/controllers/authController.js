import userService from '../services/userService.js';
import { generateJWT } from '../../../helpers/customJWT/jwtHelper.js';

class AuthController {
    /**
     * Register a new user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = { name, email, password, role };
            const newUser = await userService.createUser(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Login a user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.validateUser(email, password);
            const token = generateJWT({ id: user.id, role: user.role });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default AuthController;

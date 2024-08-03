import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';

class UserService {
    /**
     * Create a new user
     * @param {Object} user - User data
     * @returns {Promise<Object>}
     */
    async createUser(user) {
        const existingUser = await userRepository.getUserByEmail(user.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        user.password = await bcrypt.hash(user.password, 10);
        return await userRepository.createUser(user);
    }

    /**
     * Get all users
     * @returns {Promise<Array>}
     */
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    /**
     * Validate user credentials
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>}
     */
    async validateUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or user does not exist');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    /**
     * Get user by ID
     * @param {number} id - User ID
     * @returns {Promise<Object>}
     */
    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    /**
     * Update user by ID
     * @param {number} id - User ID
     * @param {Object} userData - Updated user data
     * @returns {Promise<Object>}
     */
    async updateUser(id, userData) {
        return await userRepository.updateUser(id, userData);
    }

    /**
     * Delete user by ID
     * @param {number} id - User ID
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    }
}

export default new UserService();

import { query } from "../../../config/configDB.js";

class UserRepository {
    /**
     * Get all users from the database
     * @returns {Promise<Array>} - An array of users
     */
    async getAllUsers() {
        const data = await query("SELECT * FROM users");
        return data.rows;
    }

    /**
     * Get a user by ID
     * @param {number} id - The ID of the user
     * @returns {Promise<Object>} - The user data
     */
    async getUserById(id) {
        const data = await query("SELECT * FROM users WHERE id = $1", [id]);
        return data.rows[0];
    }

    /**
     * Get a user by email
     * @param {string} email - The email of the user
     * @returns {Promise<Object>} - The user data
     */
    async getUserByEmail(email) {
        const data = await query("SELECT * FROM users WHERE email = $1", [email]);
        return data.rows[0];
    }

    /**
     * Create a new user
     * @param {Object} user - The user data
     * @param {string} user.name - The name of the user
     * @param {string} user.email - The email of the user
     * @param {string} user.password - The hashed password of the user
     * @returns {Promise<Object>} - The created user
     */
    async createUser(user) {
        const { name, email, password } = user;
        await query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password]);
        return user;
    }
}

export default new UserRepository();


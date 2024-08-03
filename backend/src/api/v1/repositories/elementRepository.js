import { query } from '../../../config/configDB.js';

class ElementRepository {
    /**
     * Get all elements
     * @returns {Promise<Array>}
     */
    async getAllElements() {
        const data = await query('SELECT * FROM elements');
        return data.rows;
    }

    /**
     * Get element by ID
     * @param {number} id - Element ID
     * @returns {Promise<Object>}
     */
    async getElementById(id) {
        const data = await query('SELECT * FROM elements WHERE id = $1', [id]);
        return data.rows[0];
    }

    /**
     * Get elements by IDs
     * @param {Array<number>} ids - Element IDs
     * @returns {Promise<Array>}
     */
    async getElementsByIds(ids) {
        const data = await query('SELECT * FROM elements WHERE id = ANY($1::int[])', [ids]);
        return data.rows;
    }

    /**
     * Update stock for an element
     * @param {number} elementId - Element ID
     * @param {number} quantity - Quantity to reduce
     * @returns {Promise<void>}
     */
    async updateStock(elementId, quantity) {
        await query('UPDATE elements SET stock_amount = stock_amount - $1 WHERE id = $2', [quantity, elementId]);
    }

    /**
     * Create a new element
     * @param {Object} elementData - Element data
     * @returns {Promise<Object>}
     */
    async createElement(elementData) {
        const {
            name,
            color,
            category,
            width,
            length,
            depth,
            stock_amount,
            price,
            installation_cost,
            installation_time
        } = elementData;
        const data = await query(
            'INSERT INTO elements (name, color, category, width, length, depth, stock_amount, price, installation_cost, installation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [name, color, category, width, length, depth, stock_amount, price, installation_cost, installation_time]
        );
        return data.rows[0];
    }

    /**
     * Update an element
     * @param {number} id - Element ID
     * @param {Object} elementData - Element data
     * @returns {Promise<Object>}
     */
    async updateElement(id, elementData) {
        const {
            name,
            color,
            category,
            width,
            length,
            depth,
            stock_amount,
            price,
            installation_cost,
            installation_time
        } = elementData;
        const data = await query(
            'UPDATE elements SET name = $1, color = $2, category = $3, width = $4, length = $5, depth = $6, stock_amount = $7, price = $8, installation_cost = $9, installation_time = $10 WHERE id = $11 RETURNING *',
            [name, color, category, width, length, depth, stock_amount, price, installation_cost, installation_time, id]
        );
        return data.rows[0];
    }

    /**
     * Delete an element
     * @param {number} id - Element ID
     * @returns {Promise<void>}
     */
    async deleteElement(id) {
        await query('DELETE FROM elements WHERE id = $1', [id]);
    }
}

export default new ElementRepository();


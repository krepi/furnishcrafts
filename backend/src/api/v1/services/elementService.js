import elementRepository from '../repositories/elementRepository.js';

class ElementService {
    /**
     * Get all elements with optional filters
     * @param {Object} filters - Filters to apply
     * @param {number} [filters.categoryId] - Category ID to filter by
     * @param {number} [filters.colorId] - Color ID to filter by
     * @returns {Promise<Array>} - List of elements
     */
    async getAllElements(filters) {
        return await elementRepository.getAllElements(filters);
    }

    /**
     * Get element by ID
     * @param {number} id - Element ID
     * @returns {Promise<Object>}
     */
    async getElementById(id) {
        return await elementRepository.getElementById(id);
    }

    /**
     * Get elements by IDs
     * @param {Array<number>} ids - Element IDs
     * @returns {Promise<Array>}
     */
    async getElementsByIds(ids) {
        return await elementRepository.getElementsByIds(ids);
    }

    /**
     * Update element stock
     * @param {Array<Object>} elements - Elements to update stock
     * @returns {Promise<void>}
     */
    async updateElementStock(elements) {
        for (const element of elements) {
            await elementRepository.updateStock(element.element_id, element.quantity);
        }
    }

    /**
     * Create a new element
     * @param {Object} elementData - Element data
     * @returns {Promise<Object>}
     */
    async createElement(elementData) {
        return await elementRepository.createElement(elementData);
    }

    /**
     * Update an element
     * @param {number} id - Element ID
     * @param {Object} elementData - Element data
     * @returns {Promise<Object>}
     */
    async updateElement(id, elementData) {
        return await elementRepository.updateElement(id, elementData);
    }

    /**
     * Delete an element
     * @param {number} id - Element ID
     * @returns {Promise<void>}
     */
    async deleteElement(id) {
        await elementRepository.deleteElement(id);
    }
}

export default new ElementService();

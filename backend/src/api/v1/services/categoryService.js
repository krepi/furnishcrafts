import categoryRepository from "../repositories/categoryRepository.js";

class CategoryService {
    /**
     * Add a new category
     * @param {Object} category - The category data
     * @param {string} category.category_name - The name of the category
     * @returns {Promise<Object>} - The created category
     */
    async addCategory(category) {
        return await categoryRepository.addCategory(category);
    }

    /**
     * Get all categories
     * @returns {Promise<Array>} - An array of categories
     */
    async getAllCategories() {
        return await categoryRepository.getAllCategories();
    }
}

export default new CategoryService();

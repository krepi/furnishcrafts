import { query } from "../../../config/configDB.js";

class CategoryRepository {
    /**
     * Add a new category to the database
     * @param {Object} category - The category data
     * @param {string} category.category_name - The name of the category
     * @returns {Promise<Object>} - The created category
     */
    async addCategory(category) {
        const { category_name } = category;
        const result = await query("INSERT INTO element_categories (category_name) VALUES ($1) RETURNING *", [category_name]);
        return result.rows[0];
    }

    /**
     * Get all categories from the database
     * @returns {Promise<Array>} - An array of categories
     */
    async getAllCategories() {
        const data = await query("SELECT * FROM element_categories");
        return data.rows;
    }
}

export default new CategoryRepository();

import categoryService from '../services/categoryService.js';

class CategoryController {
    /**
     * Get all categories
     * @route GET /api/v1/categories
     * @group Categories - Operations about categories
     * @returns {Array.<Category>} 200 - An array of categories
     * @returns {Error}  400 - Bad request
     */
    getAllCategories = async (req, res) => {
        try {
            const categories = await categoryService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default CategoryController;

import { query } from '../../../config/configDB.js';

class ProjectRepository {
    /**
     * Get all projects
     * @returns {Promise<Array>}
     */
    async getAllProjects() {
        const data = await query('SELECT * FROM projects');
        return data.rows;
    }

    /**
     * Get projects by user ID
     * @param {number} userId - User ID
     * @returns {Promise<Array>}
     */
    async getProjectsByUserId(userId) {
        const data = await query('SELECT * FROM projects WHERE user_id = $1', [userId]);
        return data.rows;
    }

    /**
     * Get project by ID
     * @param {number} projectId - Project ID
     * @returns {Promise<Object>}
     */
    async getProjectById(projectId) {
        const data = await query('SELECT * FROM projects WHERE id = $1', [projectId]);
        const project = data.rows[0];

        if (project) {
            const elementsResult = await query('SELECT element_id, quantity FROM project_elements WHERE project_id = $1', [projectId]);
            project.elements = elementsResult.rows;
        }

        return project;
    }

    /**
     * Get project elements by project ID
     * @param {number} projectId - Project ID
     * @returns {Promise<Array>}
     */
    async getProjectElements(projectId) {
        const data = await query('SELECT element_id, quantity FROM project_elements WHERE project_id = $1', [projectId]);
        return data.rows;
    }
    /**
     * Get detailed project elements by project ID
     * @param {number} projectId - Project ID
     * @returns {Promise<Array>}
     */
    async getDetailedProjectElements(projectId) {
        const data = await query(`
            SELECT pe.element_id, pe.quantity, e.name, e.color, e.category, e.price, e.installation_cost, e.installation_time 
            FROM project_elements pe
            JOIN elements e ON pe.element_id = e.id
            WHERE pe.project_id = $1
        `, [projectId]);
        return data.rows;
    }

    /**
     * Create a new project
     * @param {Object} projectData - Project data
     * @returns {Promise<Object>}
     */
    async createProject(projectData) {
        const { name, user_id, start_date } = projectData;
        const result = await query(
            'INSERT INTO projects (name, user_id, start_date) VALUES ($1, $2, $3) RETURNING *',
            [name, user_id, start_date]
        );
        return result.rows[0];
    }

    /**
     * Update project status and end date
     * @param {number} projectId - Project ID
     * @param {string} status - New project status
     * @param {string} endDate - End date of the project
     * @returns {Promise<void>}
     */
    async updateProjectStatusAndEndDate(projectId, status, endDate) {
        await query('UPDATE projects SET status = $1, end_date = $2 WHERE id = $3', [status, endDate, projectId]);
    }

    /**
     * Add element to project
     * @param {number} projectId - Project ID
     * @param {number} elementId - Element ID
     * @param {number} quantity - Quantity of element to add
     * @returns {Promise<void>}
     */
    async addElementToProject(projectId, elementId, quantity) {
        await query('INSERT INTO project_elements (project_id, element_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (project_id, element_id) DO UPDATE SET quantity = project_elements.quantity + $3', [projectId, elementId, quantity]);
    }

    /**
     * Remove specific quantity of an element from project
     * @param {number} projectId - Project ID
     * @param {number} elementId - Element ID
     * @param {number} quantity - Quantity of element to remove
     * @returns {Promise<void>}
     */
    async removeElementQuantityFromProject(projectId, elementId, quantity) {
        const result = await query('SELECT quantity FROM project_elements WHERE project_id = $1 AND element_id = $2', [projectId, elementId]);
        const currentQuantity = result.rows[0]?.quantity || 0;

        if (currentQuantity <= quantity) {
            await query('DELETE FROM project_elements WHERE project_id = $1 AND element_id = $2', [projectId, elementId]);
        } else {
            await query('UPDATE project_elements SET quantity = quantity - $1 WHERE project_id = $2 AND element_id = $3', [quantity, projectId, elementId]);
        }
    }
}

export default new ProjectRepository();

import projectRepository from '../../api/v1/repositories/projectRepository.js';
import { query } from '../../config/configDB.js';

// Mock the query function
jest.mock('../../config/configDB.js');

describe('ProjectRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @description Test suite for getAllProjects method
     * @given Mocked data returned from the database
     * @when The getAllProjects method is called
     * @then The correct query should be executed and the projects should be returned
     */
    describe('getAllProjects', () => {
        it('should return all projects', async () => {
            // Given: Mocked data returned from the database
            const mockProjects = [{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }];
            query.mockResolvedValue({ rows: mockProjects });

            // When: The getAllProjects method is called
            const result = await projectRepository.getAllProjects();

            // Then: The correct query should be executed and the projects should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM projects');
            expect(result).toEqual(mockProjects);
        });
    });

    /**
     * @description Test suite for getProjectsByUserId method
     * @given Mocked data for a specific user
     * @when The getProjectsByUserId method is called with a user ID
     * @then The correct query should be executed and the user's projects should be returned
     */
    describe('getProjectsByUserId', () => {
        it('should return projects for a specific user', async () => {
            // Given: Mocked data for a specific user
            const mockProjects = [{ id: 1, name: 'User Project 1' }];
            query.mockResolvedValue({ rows: mockProjects });

            // When: The getProjectsByUserId method is called with a user ID
            const result = await projectRepository.getProjectsByUserId(1);

            // Then: The correct query should be executed and the user's projects should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM projects WHERE user_id = $1', [1]);
            expect(result).toEqual(mockProjects);
        });
    });

    /**
     * @description Test suite for getProjectById method
     * @given Mocked data for a project and its elements
     * @when The getProjectById method is called
     * @then The correct queries should be executed and the project with elements should be returned
     */
    describe('getProjectById', () => {
        it('should return a project by its ID with associated elements', async () => {
            // Given: Mocked data for a project and its elements
            const mockProject = { id: 1, name: 'Project 1', user_id: 1 };
            const mockElements = [{ element_id: 1, quantity: 2 }, { element_id: 2, quantity: 1 }];
            query.mockResolvedValueOnce({ rows: [mockProject] });
            query.mockResolvedValueOnce({ rows: mockElements });

            // When: The getProjectById method is called
            const result = await projectRepository.getProjectById(1);

            // Then: The correct queries should be executed and the project with elements should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM projects WHERE id = $1', [1]);
            expect(query).toHaveBeenCalledWith('SELECT element_id, quantity FROM project_elements WHERE project_id = $1', [1]);
            expect(result).toEqual({ ...mockProject, elements: mockElements });
        });

        /**
         * @description Test suite for getProjectById method when no project is found
         * @given No project is found
         * @when The getProjectById method is called
         * @then The method should return undefined
         */
        it('should return undefined if no project is found', async () => {
            // Given: No project is found
            query.mockResolvedValue({ rows: [] });

            // When: The getProjectById method is called
            const result = await projectRepository.getProjectById(999);

            // Then: The method should return undefined
            expect(result).toBeUndefined();
            expect(query).toHaveBeenCalledWith('SELECT * FROM projects WHERE id = $1', [999]);
        });
    });

    /**
     * @description Test suite for getProjectElements method
     * @given Mocked data for project elements
     * @when The getProjectElements method is called
     * @then The correct query should be executed and the elements should be returned
     */
    describe('getProjectElements', () => {
        it('should return elements for a specific project', async () => {
            // Given: Mocked data for project elements
            const mockElements = [{ element_id: 1, quantity: 2 }, { element_id: 2, quantity: 1 }];
            query.mockResolvedValue({ rows: mockElements });

            // When: The getProjectElements method is called
            const result = await projectRepository.getProjectElements(1);

            // Then: The correct query should be executed and the elements should be returned
            expect(query).toHaveBeenCalledWith('SELECT element_id, quantity FROM project_elements WHERE project_id = $1', [1]);
            expect(result).toEqual(mockElements);
        });
    });

    /**
     * @description Test suite for getDetailedProjectElements method
     * @given Mocked detailed data for project elements
     * @when The getDetailedProjectElements method is called
     * @then The correct query should be executed and the detailed elements should be returned
     */
    describe('getDetailedProjectElements', () => {
        it('should return detailed project elements', async () => {
            // Given: Mocked detailed data for project elements
            const mockDetailedElements = [
                { element_id: 1, quantity: 2, name: 'Element 1', color: 1, category: 1, price: 10.0, installation_cost: 2.0, installation_time: '00:30:00' },
                { element_id: 2, quantity: 1, name: 'Element 2', color: 2, category: 1, price: 20.0, installation_cost: 3.0, installation_time: '00:45:00' }
            ];
            query.mockResolvedValue({ rows: mockDetailedElements });

            // When: The getDetailedProjectElements method is called
            const result = await projectRepository.getDetailedProjectElements(1);

            // Then: The correct query should be executed and the detailed elements should be returned
            const expectedQuery = `
                SELECT pe.element_id, pe.quantity, e.name, e.color, e.category, e.price, e.installation_cost, e.installation_time 
                FROM project_elements pe
                JOIN elements e ON pe.element_id = e.id
                WHERE pe.project_id = $1
            `.replace(/\s+/g, ' ').trim();

            // Clean the query for comparison
            const cleanQuery = (str) => str.replace(/\s+/g, ' ').trim();

            // Compare the cleaned actual query with the expected query
            expect(cleanQuery(query.mock.calls[0][0])).toBe(expectedQuery);

            // Check query parameters
            expect(query.mock.calls[0][1]).toEqual([1]);

            // Check the result
            expect(result).toEqual(mockDetailedElements);
        });
    });

    /**
     * @description Test suite for createProject method
     * @given Valid project data
     * @when The createProject method is called
     * @then The correct insert query should be executed and the new project should be returned
     */
    describe('createProject', () => {
        it('should create a new project and return it', async () => {
            // Given: Valid project data
            const mockProject = { id: 1, name: 'New Project', user_id: 1, start_date: '2024-01-01' };
            query.mockResolvedValue({ rows: [mockProject] });

            // When: The createProject method is called
            const projectData = { name: 'New Project', user_id: 1, start_date: '2024-01-01' };
            const result = await projectRepository.createProject(projectData);

            // Then: The correct insert query should be executed and the new project should be returned
            expect(query).toHaveBeenCalledWith(
                'INSERT INTO projects (name, user_id, start_date) VALUES ($1, $2, $3) RETURNING *',
                ['New Project', 1, '2024-01-01']
            );
            expect(result).toEqual(mockProject);
        });
    });

    /**
     * @description Test suite for updateProjectStatusAndEndDate method
     * @given Valid project ID, status, and end date
     * @when The updateProjectStatusAndEndDate method is called
     * @then The correct update query should be executed
     */
    describe('updateProjectStatusAndEndDate', () => {
        it('should update the project status and end date', async () => {
            // Given: Valid project ID, status, and end date
            query.mockResolvedValue({});

            // When: The updateProjectStatusAndEndDate method is called
            await projectRepository.updateProjectStatusAndEndDate(1, 'closed', '2024-02-01');

            // Then: The correct update query should be executed
            expect(query).toHaveBeenCalledWith(
                'UPDATE projects SET status = $1, end_date = $2 WHERE id = $3',
                ['closed', '2024-02-01', 1]
            );
        });
    });

    /**
     * @description Test suite for addElementToProject method
     * @given A valid project ID, element ID, and quantity
     * @when The addElementToProject method is called
     * @then The correct insert or update query should be executed
     */
    describe('addElementToProject', () => {
        it('should add or update an element in a project', async () => {
            // Given: A valid project ID, element ID, and quantity
            query.mockResolvedValue({});

            // When: The addElementToProject method is called
            await projectRepository.addElementToProject(1, 2, 5);

            // Then: The correct insert or update query should be executed
            expect(query).toHaveBeenCalledWith(
                'INSERT INTO project_elements (project_id, element_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (project_id, element_id) DO UPDATE SET quantity = project_elements.quantity + $3',
                [1, 2, 5]
            );
        });
    });

    /**
     * @description Test suite for removeElementQuantityFromProject method
     * @given A valid project ID and element ID with enough quantity
     * @when The removeElementQuantityFromProject method is called
     * @then The correct update query should be executed
     */
    describe('removeElementQuantityFromProject', () => {
        it('should remove a specific quantity of an element or delete it if quantity is zero', async () => {
            // Given: A valid project ID and element ID with enough quantity
            query.mockResolvedValueOnce({ rows: [{ quantity: 5 }] }); // Initial quantity
            query.mockResolvedValueOnce({}); // For the update or delete

            // When: The removeElementQuantityFromProject method is called
            await projectRepository.removeElementQuantityFromProject(1, 2, 3);

            // Then: The correct update query should be executed
            expect(query).toHaveBeenCalledWith('SELECT quantity FROM project_elements WHERE project_id = $1 AND element_id = $2', [1, 2]);
            expect(query).toHaveBeenCalledWith('UPDATE project_elements SET quantity = quantity - $1 WHERE project_id = $2 AND element_id = $3', [3, 1, 2]);
        });

        /**
         * @description Test suite for removeElementQuantityFromProject method when quantity is low
         * @given A valid project ID and element ID with low quantity
         * @when The removeElementQuantityFromProject method is called
         * @then The correct delete query should be executed
         */
        it('should delete the element if the remaining quantity is zero or less', async () => {
            // Given: A valid project ID and element ID with low quantity
            query.mockResolvedValueOnce({ rows: [{ quantity: 2 }] }); // Initial quantity
            query.mockResolvedValueOnce({}); // For the delete

            // When: The removeElementQuantityFromProject method is called
            await projectRepository.removeElementQuantityFromProject(1, 2, 3);

            // Then: The correct delete query should be executed
            expect(query).toHaveBeenCalledWith('SELECT quantity FROM project_elements WHERE project_id = $1 AND element_id = $2', [1, 2]);
            expect(query).toHaveBeenCalledWith('DELETE FROM project_elements WHERE project_id = $1 AND element_id = $2', [1, 2]);
        });
    });
});

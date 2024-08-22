import projectService from '../../api/v1/services/projectService.js';
import projectRepository from '../../api/v1/repositories/projectRepository.js';
import elementService from '../../api/v1/services/elementService.js';
import projectCalculationService from '../../api/v1/services/projectCalculationService.js';
import {projects} from '../_mocks_/projectMockData.js';
import {elements, detailedProjectElements} from '../_mocks_/elementsMockData.js';

// Mock dependencies
jest.mock('../../api/v1/repositories/projectRepository.js');
jest.mock('../../api/v1/services/elementService.js');
jest.mock('../../api/v1/services/projectCalculationService.js');

describe('ProjectService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        projectRepository.getDetailedProjectElements.mockResolvedValue(detailedProjectElements);
        projectRepository.getProjectElements.mockResolvedValue(projects[0].elements);
        elementService.getElementsByIds.mockResolvedValue(elements);
    });

    describe('getProjects', () => {
        /**
         * Scenario: An administrator requests all projects
         * Given: The user is an administrator
         * When: The getProjects method is called with admin role
         * Then: All projects should be returned
         */
        it('should return all projects for an administrator', async () => {
            // Given:
            projectRepository.getAllProjects.mockResolvedValue(projects);

            // When:
            const result = await projectService.getProjects(2, 'administrator');

            // Then:
            expect(result).toEqual(projects);
            expect(projectRepository.getAllProjects).toHaveBeenCalled();
        });

        /**
         * Scenario: A standard user requests their projects
         * Given: The user is a standard user
         * When: The getProjects method is called with standard user role
         * Then: Only the user’s projects should be returned
         */
        it('should return only the user\'s projects for a standard user', async () => {
            // Given:
            const userProjects = projects.filter(p => p.user_id === 1);
            projectRepository.getProjectsByUserId.mockResolvedValue(userProjects);

            // When:
            const result = await projectService.getProjects(1, 'standard');

            // Then:
            expect(result).toEqual(userProjects);
            expect(projectRepository.getProjectsByUserId).toHaveBeenCalledWith(1);
        });
    });

    describe('addElementToProject', () => {
        /**
         * Scenario: An authorized user adds an element to their project
         * Given: The user is authorized to add elements to the project
         * When: The addElementToProject method is called
         * Then: The element should be added to the project and the repository should be called with correct parameters
         */
        it('should add an element to the project if user is authorized', async () => {
            // Given:
            const project = projects[0];
            const element = elements[0];

            projectRepository.getProjectById.mockResolvedValue(project);
            elementService.getElementById.mockResolvedValue(element);

            // When:
            await projectService.addElementToProject(project.id, element.id, 2, project.user_id, 'standard');

            // Then:
            expect(projectRepository.addElementToProject).toHaveBeenCalledWith(project.id, element.id, 2);
            expect(projectRepository.getProjectById).toHaveBeenCalledWith(project.id);
        });

        /**
         * Scenario: An unauthorized user attempts to add an element to a project
         * Given: The user is not authorized to add elements
         * When: The addElementToProject method is called
         * Then: The method should throw an error
         */
        it('should throw an error if user is not authorized to add elements to the project', async () => {
            // Given:
            const project = projects[0];

            projectRepository.getProjectById.mockResolvedValue(project);

            // When:
            // Then:
            await expect(projectService.addElementToProject(project.id, 1, 2, 999, 'standard'))
                .rejects.toThrow('Not authorized to add elements to this project');
        });
        /**
         * Scenario: A user attempts to add a non-existent element
         * Given: The element does not exist
         * When: The addElementToProject method is called
         * Then: The method should throw an error indicating the element is not found
         */
        it('should throw an error if the element does not exist', async () => {
            // Given:
            const project = projects[0];
            projectRepository.getProjectById.mockResolvedValue(project);
            elementService.getElementById.mockResolvedValue(null); // Simulating a not exist element

            // When:
            // Then:
            await expect(projectService.addElementToProject(project.id, 999, 2, project.user_id, 'standard'))
                .rejects.toThrow('Element not found');
        });
        /**
         * Scenario: Adding an element to a non-existent project
         * Given: The project does not exist
         * When: The addElementToProject method is called
         * Then: The method should throw an error indicating that the project is not found
         */
        it('should throw an error if the project is not found when adding an element', async () => {
            // Given:
            projectRepository.getProjectById.mockResolvedValue(null); // Simulating a non-existent project

            // When:
            // Then:
            await expect(projectService.addElementToProject(999, 1, 2, 1, 'standard'))
                .rejects.toThrow('Project not found');
        });
    });

    describe('getDetailedProjectElements', () => {
        /**
         * Scenario: A user requests detailed information about a project
         * Given: The project details include elements, costs, and time
         * When: The getDetailedProjectElements method is called
         * Then: The detailed project information should be returned with cost and time calculations
         */
        it('should return detailed project information including cost and time calculations', async () => {
            // Given: A user requests detailed information about a project
            const project = projects[0];
            const costAndTimeCalculation = {
                purchaseCost: 300,
                installationCost: 75,
                totalCost: 375,
                totalTime: 180,
                outOfStock: []
            };

            projectRepository.getProjectById.mockResolvedValue(project);
            projectRepository.getDetailedProjectElements.mockResolvedValue(detailedProjectElements);
            projectCalculationService.calculateProjectCostAndTime.mockReturnValue(costAndTimeCalculation);

            // When:
            const result = await projectService.getDetailedProjectElements(project.id);

            // Then:
            expect(result).toEqual({
                ...project,
                purchaseCost: 300,
                installationCost: 75,
                totalCost: 375,
                totalTime: 180,
                outOfStock: [],
                elements: detailedProjectElements
            });

            expect(projectRepository.getProjectById).toHaveBeenCalledWith(project.id);
            expect(projectRepository.getDetailedProjectElements).toHaveBeenCalledWith(project.id);

            // Simplified comparison for input data to calculateProjectCostAndTime
            expect(projectCalculationService.calculateProjectCostAndTime).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({element_id: 1, quantity: 4}),
                    expect.objectContaining({element_id: 2, quantity: 2}),
                    expect.objectContaining({element_id: 3, quantity: 1})
                ]),
                elements
            );
        });
    });
    describe('ProjectService - createProject', () => {
        /**
         * Scenario: Creating a new project
         * Given: Valid project data is provided
         * When: The createProject method is called
         * Then: The project should be created and returned
         */
        it('should create a new project and return it', async () => {
            // Given: Valid project data
            const projectData = {name: 'New Project', user_id: 1, start_date: '2024-01-01'};
            const mockProject = {id: 1, ...projectData};
            projectRepository.createProject.mockResolvedValue(mockProject);

            // When: The createProject method is called
            const result = await projectService.createProject(projectData);

            // Then: The correct repository method should be called, and the created project should be returned
            expect(projectRepository.createProject).toHaveBeenCalledWith(projectData);
            expect(result).toEqual(mockProject);
        });
    });

    describe('calculateProjectCostAndTime', () => {
        /**
         * Scenario: A project with elements needs cost and time calculations
         * Given: The project contains several elements
         * When: The calculateProjectCostAndTime method is called
         * Then: The correct cost and time calculations should be returned
         */
        it('should correctly calculate project costs and time based on elements', async () => {
            // Given:
            const projectElements = projects[0].elements;
            const elementIds = projectElements.map(pe => pe.element_id);

            elementService.getElementsByIds.mockResolvedValue(elements);
            projectCalculationService.calculateProjectCostAndTime.mockReturnValue({
                purchaseCost: 300,
                installationCost: 75,
                totalCost: 375,
                totalTime: 180,
                outOfStock: []
            });

            // When:
            const result = await projectService.calculateProjectCostAndTime(projects[0].id);

            // Then:
            expect(result).toEqual({
                purchaseCost: 300,
                installationCost: 75,
                totalCost: 375,
                totalTime: 180,
                outOfStock: []
            });

            expect(elementService.getElementsByIds).toHaveBeenCalledWith(elementIds);
            expect(projectCalculationService.calculateProjectCostAndTime).toHaveBeenCalledWith(projectElements, elements);
        });
    });

    describe('updateProjectStock', () => {
        /**
         * Scenario: Project stock needs to be updated
         * Given: A project with elements
         * When: The updateProjectStock method is called
         * Then: The stock for the elements should be updated via elementService
         */
        it('should update stock for elements in the project', async () => {
            // Given:
            projectRepository.getProjectElements.mockResolvedValue(projects[0].elements);

            // When:
            await projectService.updateProjectStock(projects[0].id);

            // Then:
            expect(projectRepository.getProjectElements).toHaveBeenCalledWith(projects[0].id);
            expect(elementService.updateElementStock).toHaveBeenCalledWith(projects[0].elements);
        });
    });

    describe('removeElementQuantityFromProject', () => {
        /**
         * Scenario: A user removes a specific quantity of an element from a project
         * Given: The user is authorized and the project exists
         * When: The removeElementQuantityFromProject method is called
         * Then: The element quantity should be updated or removed
         */
        it('should remove specific quantity of an element if user is authorized', async () => {
            // Given:
            const project = projects[0];
            projectRepository.getProjectById.mockResolvedValue(project);

            // When:
            await projectService.removeElementQuantityFromProject(project.id, elements[0].id, 1, project.user_id, 'standard');

            // Then:
            expect(projectRepository.getProjectById).toHaveBeenCalledWith(project.id);
            expect(projectRepository.removeElementQuantityFromProject).toHaveBeenCalledWith(project.id, elements[0].id, 1);
        });

        /**
         * Scenario: An unauthorized user attempts to remove an element from a project
         * Given: The user is not authorized to remove elements
         * When: The removeElementQuantityFromProject method is called
         * Then: The method should throw an error
         */
        it('should throw an error if user is not authorized to remove elements from the project', async () => {
            // Given:
            const project = projects[0];
            projectRepository.getProjectById.mockResolvedValue(project);

            // When:
            // Then:
            await expect(projectService.removeElementQuantityFromProject(project.id, elements[0].id, 1, 999, 'standard'))
                .rejects.toThrow('Not authorized to remove elements from this project');
        });
        /**
         * Scenario: Removing an element from a non-existent project
         * Given: The project does not exist
         * When: The removeElementQuantityFromProject method is called
         * Then: The method should throw an error indicating that the project is not found
         */
        it('should throw an error if the project is not found when removing an element', async () => {
            // Given:
            projectRepository.getProjectById.mockResolvedValue(null); // Simulating a non-existent project

            // When:
            // Then:
            await expect(projectService.removeElementQuantityFromProject(999, 1, 1, 1, 'standard'))
                .rejects.toThrow('Project not found');
        });
    });

    describe('closeProject', () => {
        /**
         * Scenario: A project needs to be closed and stock updated
         * Given: The project exists and the user is authorized
         * When: The closeProject method is called
         * Then: The project should be closed and the stock updated
         */
        it('should close a project and update the stock', async () => {
            // Given:
            const project = projects[0];
            const projectElements = project.elements;
            const endDate = new Date().toISOString().split('T')[0];

            projectRepository.getProjectById.mockResolvedValue(project);
            projectRepository.getProjectElements.mockResolvedValue(projectElements);

            // When:
            await projectService.closeProject(project.id, project.user_id, 'standard');

            // Then:
            expect(projectRepository.getProjectById).toHaveBeenCalledWith(project.id);
            expect(projectRepository.updateProjectStatusAndEndDate).toHaveBeenCalledWith(project.id, 'ordered', endDate);
            expect(projectRepository.getProjectElements).toHaveBeenCalledWith(project.id);
            expect(elementService.updateElementStock).toHaveBeenCalledWith(projectElements);
        });

        /**
         * Scenario: An unauthorized user attempts to close a project
         * Given: The user is not authorized to close the project
         * When: The closeProject method is called
         * Then: The method should throw an error
         */
        it('should throw an error if user is not authorized to close the project', async () => {
            // Given:
            const project = projects[0];
            projectRepository.getProjectById.mockResolvedValue(project);

            // When:
            // Then:
            await expect(projectService.closeProject(project.id, 999, 'standard'))
                .rejects.toThrow('Not authorized to close this project');
        });
        /**
         * Scenario: A user attempts to close a non-existent project
         * Given: The project does not exist
         * When: The closeProject method is called
         * Then: The method should throw an error indicating the project is not found
         */
        it('should throw an error if the project does not exist', async () => {
            // Given:
            projectRepository.getProjectById.mockResolvedValue(null); // Simulujemy brak projektu

            // When:
            // Then:
            await expect(projectService.closeProject(999, 1, 'standard'))
                .rejects.toThrow('Project not found');
        });
    });
});

import projectService from '../../api/v1/services/projectService.js';
import projectRepository from '../../api/v1/repositories/projectRepository.js';
import elementService from '../../api/v1/services/elementService.js';
import projectCalculationService from '../../api/v1/services/projectCalculationService.js';
import { projects } from '../_mocks_/projectMockData.js';
import { elements, detailedProjectElements } from '../_mocks_/elementsMockData.js';

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
                    expect.objectContaining({ element_id: 1, quantity: 4 }),
                    expect.objectContaining({ element_id: 2, quantity: 2 }),
                    expect.objectContaining({ element_id: 3, quantity: 1 })
                ]),
                elements
            );
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
});

import elementService from '../../api/v1/services/elementService.js';
import elementRepository from '../../api/v1/repositories/elementRepository.js';
import { elements } from '../_mocks_/elementsMockData.js';

// Mock dependencies
jest.mock('../../api/v1/repositories/elementRepository.js');

describe('ElementService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test for getAllElements method.
     * Given: The repository contains elements.
     * When: The service method is called with specific filters.
     * Then: The repository should be queried with the correct filters, and the result should match the expected elements.
     */
    describe('getAllElements', () => {
        it('should call getAllElements on the repository with the correct filters', async () => {
            // Given
            elementRepository.getAllElements.mockResolvedValue(elements);

            const filters = { categoryId: 1, colorId: 2 };

            // When
            const result = await elementService.getAllElements(filters);

            // Then
            expect(result).toEqual(elements);
            expect(elementRepository.getAllElements).toHaveBeenCalledWith(filters);
        });
    });

    /**
     * Test for getElementById method.
     * Given: The repository contains an element with a specific ID.
     * When: The service method is called with that ID.
     * Then: The repository should be queried with the correct ID, and the result should match the expected element.
     */
    describe('getElementById', () => {
        it('should call getElementById on the repository with the correct id', async () => {
            // Given
            const mockElement = elements[0];
            elementRepository.getElementById.mockResolvedValue(mockElement);

            // When
            const result = await elementService.getElementById(1);

            // Then
            expect(result).toEqual(mockElement);
            expect(elementRepository.getElementById).toHaveBeenCalledWith(1);
        });
    });

    /**
     * Test for getElementsByIds method.
     * Given: The repository contains multiple elements with specific IDs.
     * When: The service method is called with a list of IDs.
     * Then: The repository should be queried with the correct IDs, and the result should match the expected elements.
     */
    describe('getElementsByIds', () => {
        it('should call getElementsByIds on the repository with the correct ids', async () => {
            // Given
            const elementIds = [1, 2, 3];
            elementRepository.getElementsByIds.mockResolvedValue([elements[0], elements[1], elements[2]]);

            // When
            const result = await elementService.getElementsByIds(elementIds);

            // Then
            expect(result).toEqual([elements[0], elements[1], elements[2]]);
            expect(elementRepository.getElementsByIds).toHaveBeenCalledWith(elementIds);
        });
    });

    /**
     * Test for updateElementStock method.
     * Given: A list of elements that need stock updates.
     * When: The service method is called with that list.
     * Then: The repository should be called with the correct element IDs and quantities for each update.
     */
    describe('updateElementStock', () => {
        it('should call updateStock on the repository for each element with the correct arguments', async () => {
            // Given
            const projectElements = [
                { element_id: 1, quantity: 4 },
                { element_id: 2, quantity: 2 },
            ];

            // When
            await elementService.updateElementStock(projectElements);

            // Then
            expect(elementRepository.updateStock).toHaveBeenCalledTimes(2);
            expect(elementRepository.updateStock).toHaveBeenCalledWith(1, 4);
            expect(elementRepository.updateStock).toHaveBeenCalledWith(2, 2);
        });
    });

    /**
     * Test for createElement method.
     * Given: New element data.
     * When: The service method is called with that data.
     * Then: The repository should be called with the correct element data, and the returned result should match the expected created element.
     */
    describe('createElement', () => {
        it('should call createElement on the repository with the correct element data', async () => {
            // Given
            const newElement = { name: 'New Element', price: 50.00 };
            elementRepository.createElement.mockResolvedValue({ id: 6, ...newElement });

            // When
            const result = await elementService.createElement(newElement);

            // Then
            expect(result).toEqual({ id: 6, ...newElement });
            expect(elementRepository.createElement).toHaveBeenCalledWith(newElement);
        });
    });

    /**
     * Test for updateElement method.
     * Given: An existing element's ID and updated data.
     * When: The service method is called with that ID and data.
     * Then: The repository should be called with the correct ID and updated data, and the result should match the expected updated element.
     */
    describe('updateElement', () => {
        it('should call updateElement on the repository with the correct id and data', async () => {
            // Given
            const updatedElement = { name: 'Updated Element', price: 75.00 };
            elementRepository.updateElement.mockResolvedValue({ id: 1, ...updatedElement });

            // When
            const result = await elementService.updateElement(1, updatedElement);

            // Then
            expect(result).toEqual({ id: 1, ...updatedElement });
            expect(elementRepository.updateElement).toHaveBeenCalledWith(1, updatedElement);
        });
    });

    /**
     * Test for deleteElement method.
     * Given: An existing element's ID.
     * When: The service method is called with that ID.
     * Then: The repository should be called with the correct ID to delete the element.
     */
    describe('deleteElement', () => {
        it('should call deleteElement on the repository with the correct id', async () => {
            // When
            await elementService.deleteElement(1);

            // Then
            expect(elementRepository.deleteElement).toHaveBeenCalledWith(1);
        });
    });
});

import elementRepository from '../../api/v1/repositories/elementRepository.js';
import { query } from '../../config/configDB.js';

// Mock the query function
jest.mock('../../config/configDB.js');

describe('ElementRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * @description Test suite for getAllElements method
     * @given No filters are applied
     * @when The getAllElements method is called without filters
     * @then The correct query should be executed and all elements should be returned
     */
    describe('getAllElements', () => {
        it('should return all elements when no filters are applied', async () => {
            // Given: No filters are applied
            const mockElements = [{ id: 1, name: 'Element 1' }, { id: 2, name: 'Element 2' }];
            query.mockResolvedValue({ rows: mockElements });

            // When: The getAllElements method is called without filters
            const result = await elementRepository.getAllElements({});

            // Then: The correct query should be executed and all elements should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM elements WHERE 1=1', []);
            expect(result).toEqual(mockElements);
        });

        /**
         * @description Test suite for getAllElements method with filters
         * @given Filters for category and color are provided
         * @when The getAllElements method is called with filters
         * @then The correct query with filters should be executed
         */
        it('should apply category and color filters when provided', async () => {
            // Given: Filters for category and color are provided
            const mockElements = [{ id: 1, name: 'Filtered Element' }];
            query.mockResolvedValue({ rows: mockElements });

            // When: The getAllElements method is called with filters
            const filters = { categoryId: 1, colorId: 2 };
            const result = await elementRepository.getAllElements(filters);

            // Then: The correct query with filters should be executed
            expect(query).toHaveBeenCalledWith(
                'SELECT * FROM elements WHERE 1=1 AND category = $1 AND color = $2',
                [1, 2]
            );
            expect(result).toEqual(mockElements);
        });
    });

    /**
     * @description Test suite for getElementById method
     * @given An element with a specific ID exists
     * @when The getElementById method is called with an ID
     * @then The correct query should be executed and the element should be returned
     */
    describe('getElementById', () => {
        it('should return a single element by ID', async () => {
            // Given: An element with a specific ID exists
            const mockElement = { id: 1, name: 'Element 1' };
            query.mockResolvedValue({ rows: [mockElement] });

            // When: The getElementById method is called with an ID
            const result = await elementRepository.getElementById(1);

            // Then: The correct query should be executed and the element should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM elements WHERE id = $1', [1]);
            expect(result).toEqual(mockElement);
        });
    });

    /**
     * @description Test suite for getElementsByIds method
     * @given Elements with specific IDs exist
     * @when The getElementsByIds method is called with an array of IDs
     * @then The correct query should be executed and the elements should be returned
     */
    describe('getElementsByIds', () => {
        it('should return multiple elements by their IDs', async () => {
            // Given: Elements with specific IDs exist
            const mockElements = [{ id: 1, name: 'Element 1' }, { id: 2, name: 'Element 2' }];
            query.mockResolvedValue({ rows: mockElements });

            // When: The getElementsByIds method is called with an array of IDs
            const result = await elementRepository.getElementsByIds([1, 2]);

            // Then: The correct query should be executed and the elements should be returned
            expect(query).toHaveBeenCalledWith('SELECT * FROM elements WHERE id = ANY($1::int[])', [[1, 2]]);
            expect(result).toEqual(mockElements);
        });
    });

    /**
     * @description Test suite for updateStock method
     * @given A valid element ID and quantity
     * @when The updateStock method is called
     * @then The correct update query should be executed
     */
    describe('updateStock', () => {
        it('should update the stock of an element', async () => {
            // Given: A valid element ID and quantity
            query.mockResolvedValue({});

            // When: The updateStock method is called
            await elementRepository.updateStock(1, 10);

            // Then: The correct update query should be executed
            expect(query).toHaveBeenCalledWith(
                'UPDATE elements SET stock_amount = stock_amount - $1 WHERE id = $2',
                [10, 1]
            );
        });
    });

    /**
     * @description Test suite for createElement method
     * @given Valid element data
     * @when The createElement method is called with element data
     * @then The correct insert query should be executed and the new element should be returned
     */
    describe('createElement', () => {
        it('should create a new element and return it', async () => {
            // Given: Valid element data
            const mockElement = { id: 1, name: 'New Element' };
            query.mockResolvedValue({ rows: [mockElement] });

            // When: The createElement method is called with element data
            const elementData = {
                name: 'New Element',
                color: 1,
                category: 1,
                width: 10,
                length: 20,
                depth: 5,
                stock_amount: 50,
                price: 100,
                installation_cost: 20,
                installation_time: '00:30:00'
            };
            const result = await elementRepository.createElement(elementData);

            // Then: The correct insert query should be executed and the new element should be returned
            expect(query).toHaveBeenCalledWith(
                'INSERT INTO elements (name, color, category, width, length, depth, stock_amount, price, installation_cost, installation_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [
                    elementData.name, elementData.color, elementData.category, elementData.width, elementData.length,
                    elementData.depth, elementData.stock_amount, elementData.price, elementData.installation_cost, elementData.installation_time
                ]
            );
            expect(result).toEqual(mockElement);
        });
    });

    /**
     * @description Test suite for updateElement method
     * @given Valid element ID and updated data
     * @when The updateElement method is called
     * @then The correct update query should be executed and the updated element should be returned
     */
    describe('updateElement', () => {
        it('should update an existing element and return it', async () => {
            // Given: Valid element ID and updated data
            const mockElement = { id: 1, name: 'Updated Element' };
            query.mockResolvedValue({ rows: [mockElement] });

            // When: The updateElement method is called
            const elementData = {
                name: 'Updated Element',
                color: 1,
                category: 1,
                width: 15,
                length: 25,
                depth: 5,
                stock_amount: 30,
                price: 120,
                installation_cost: 25,
                installation_time: '00:45:00'
            };
            const result = await elementRepository.updateElement(1, elementData);

            // Then: The correct update query should be executed and the updated element should be returned
            expect(query).toHaveBeenCalledWith(
                'UPDATE elements SET name = $1, color = $2, category = $3, width = $4, length = $5, depth = $6, stock_amount = $7, price = $8, installation_cost = $9, installation_time = $10 WHERE id = $11 RETURNING *',
                [
                    elementData.name, elementData.color, elementData.category, elementData.width, elementData.length,
                    elementData.depth, elementData.stock_amount, elementData.price, elementData.installation_cost, elementData.installation_time, 1
                ]
            );
            expect(result).toEqual(mockElement);
        });
    });

    /**
     * @description Test suite for deleteElement method
     * @given A valid element ID
     * @when The deleteElement method is called
     * @then The correct delete query should be executed
     */
    describe('deleteElement', () => {
        it('should delete an element by ID', async () => {
            // Given: A valid element ID
            query.mockResolvedValue({});

            // When: The deleteElement method is called
            await elementRepository.deleteElement(1);

            // Then: The correct delete query should be executed
            expect(query).toHaveBeenCalledWith('DELETE FROM elements WHERE id = $1', [1]);
        });
    });
});

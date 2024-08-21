import projectCalculationService from '../../api/v1/services/projectCalculationService.js';
import { elements } from '../_mocks_/elementsMockData.js';
import { projects } from '../_mocks_/projectMockData.js';

describe('ProjectCalculationService', () => {
    describe('calculateProjectCostAndTime', () => {
        /**
         * Scenario: Calculating the total purchase cost, installation cost, total cost, and time
         * Given: A project with a set of elements
         * When: The calculateProjectCostAndTime method is called
         * Then: The method should correctly calculate the purchase cost, installation cost, total cost, and total time
         */
        it('should correctly calculate purchase cost, installation cost, total cost, and total time', () => {
            // Given
            const projectElements = projects[0].elements;

            // When
            const result = projectCalculationService.calculateProjectCostAndTime(projectElements, elements);

            // Then
            expect(result.purchaseCost).toBe(180); // Example based on mock data
            expect(result.installationCost).toBe(24); // Example based on mock data
            expect(result.totalCost).toBe(204); // purchaseCost + installationCost
            expect(result.totalTime).toBe(270); // Based on installation time in mock data
            expect(result.outOfStock).toEqual([]); // Assuming no out-of-stock elements in mock data
        });

        /**
         * Scenario: Handling out-of-stock elements during cost and time calculations
         * Given: A project where certain elements have low stock
         * When: The calculateProjectCostAndTime method is called
         * Then: The method should include out-of-stock elements in the result
         */
        it('should include out-of-stock elements in the result', () => {
            // Given
            const projectElements = projects[2].elements; // Project with potential out-of-stock items

            const mockElementsWithLowStock = [
                ...elements,
                { id: 5, stock_amount: 1, price: '50.00', installation_cost: '20.00', installation_time: { minutes: 30 } }
            ];

            // When
            const result = projectCalculationService.calculateProjectCostAndTime(projectElements, mockElementsWithLowStock);

            // Then
            expect(result.outOfStock).toEqual([{ elementId: 5, available: 1 }]);
        });
    });

    describe('applyDiscounts', () => {
        /**
         * Scenario: Applying multiple discounts to a total cost
         * Given: A total cost and a set of discounts
         * When: The applyDiscounts method is called
         * Then: The method should correctly apply all discounts and return the final total cost
         */
        it('should apply multiple discounts correctly', () => {
            // Given
            const totalCost = 100;
            const discounts = [10, 10]; // 10% + 10%

            // When
            const result = projectCalculationService.applyDiscounts(totalCost, discounts);

            // Then
            expect(result).toBe(81); // 100 -> 90 (after first 10%) -> 81 (after second 10%)
        });

        /**
         * Scenario: Returning the original total cost if no discounts are applied
         * Given: A total cost without any discounts
         * When: The applyDiscounts method is called
         * Then: The method should return the original total cost
         */
        it('should return the original total cost if no discounts are applied', () => {
            // Given
            const totalCost = 100;
            const discounts = [];

            // When
            const result = projectCalculationService.applyDiscounts(totalCost, discounts);

            // Then
            expect(result).toBe(100);
        });
    });
});

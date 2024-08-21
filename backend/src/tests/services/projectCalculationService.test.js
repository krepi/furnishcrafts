import projectCalculationService from '../../api/v1/services/projectCalculationService.js';
import { elements } from '../_mocks_/elementsMockData.js';
import { projects } from '../_mocks_/projectMockData.js';

describe('ProjectCalculationService', () => {
    describe('calculateProjectCostAndTime', () => {
        it('should correctly calculate purchase cost, installation cost, total cost, and total time', () => {
            const projectElements = projects[0].elements; // Wyciągamy same elementy z projektu

            const result = projectCalculationService.calculateProjectCostAndTime(projectElements, elements);

            expect(result.purchaseCost).toBe(180); // Example based on mock data
            expect(result.installationCost).toBe(24); // Example based on mock data
            expect(result.totalCost).toBe(204); // purchaseCost + installationCost
            expect(result.totalTime).toBe(270); // Based on installation time in mock data
            expect(result.outOfStock).toEqual([]); // Assuming no out-of-stock elements in mock data
        });

        it('should include out-of-stock elements in the result', () => {
            const projectElements = projects[2].elements; // Używamy projektu, gdzie mogą być braki

            const mockElementsWithLowStock = [
                ...elements,
                { id: 5, stock_amount: 1, price: '50.00', installation_cost: '20.00', installation_time: { minutes: 30 } }
            ];

            const result = projectCalculationService.calculateProjectCostAndTime(projectElements, mockElementsWithLowStock);

            expect(result.outOfStock).toEqual([{ elementId: 5, available: 1 }]);
        });
    });

    describe('applyDiscounts', () => {
        it('should apply multiple discounts correctly', () => {
            const totalCost = 100;
            const discounts = [10, 10]; // 10% + 10%

            const result = projectCalculationService.applyDiscounts(totalCost, discounts);

            expect(result).toBe(81); // 100 -> 90 (after first 10%) -> 81 (after second 10%)
        });

        it('should return the original total cost if no discounts are applied', () => {
            const totalCost = 100;
            const discounts = [];

            const result = projectCalculationService.applyDiscounts(totalCost, discounts);

            expect(result).toBe(100);
        });
    });
});

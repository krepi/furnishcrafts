class ProjectCalculationService {
    /**
     * Calculate the total cost and time for a project
     * @param {Array} projectElements - Elements in the project
     * @param {Array} elements - Detailed information of elements
     * @returns {Object} - Purchase cost, installation cost, total cost, total time, and out-of-stock elements
     */
    calculateProjectCostAndTime(projectElements, elements) {
        let purchaseCost = 0;
        let installationCost = 0;
        let totalTime = 0; // in minutes
        let outOfStock = [];

        projectElements.forEach(pe => {
            const element = elements.find(e => e.id === pe.element_id);
            if (element.stock_amount < pe.quantity) {
                outOfStock.push({ elementId: pe.element_id, available: element.stock_amount });
            }
            purchaseCost += parseFloat(element.price) * pe.quantity;
            installationCost += parseFloat(element.installation_cost) * pe.quantity;

            // Convert installation_time to minutes if it contains hours
            let installationTime = element.installation_time;
            if (installationTime.hours) {
                totalTime += installationTime.hours * 60 * pe.quantity;
            } else if (installationTime.minutes) {
                totalTime += installationTime.minutes * pe.quantity;
            }
        });

        const totalCost = purchaseCost + installationCost;

        return { purchaseCost, installationCost, totalCost, totalTime, outOfStock };
    }

    /**
     * Apply discounts to the total cost
     * @param {number} totalCost - Initial total cost
     * @param {Array} discounts - List of applicable discounts
     * @returns {number} - Final total cost after applying discounts
     */
    applyDiscounts(totalCost, discounts) {
        discounts.forEach(discount => {
            totalCost -= totalCost * (discount / 100);
        });
        return totalCost;
    }

    // Future methods for handling discounts and promotions can be added here
}

export default new ProjectCalculationService();

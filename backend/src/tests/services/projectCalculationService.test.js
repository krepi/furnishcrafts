import projectCalculationService from '../../api/v1/services/projectCalculationService.js';


test('is discount calculate', ()=>{
    expect(projectCalculationService.applyDiscounts(100,[10,10])).toBe(81);
})
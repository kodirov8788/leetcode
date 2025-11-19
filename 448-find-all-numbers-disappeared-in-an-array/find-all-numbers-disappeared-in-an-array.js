/**
 * @param {number[]} nums
 * @return {number[]}
 */

var findDisappearedNumbers = function(nums) {
    const result = [];
    
    // Step 1: Mark present numbers by negating the value at index (num-1)
    for (let i = 0; i < nums.length; i++) {
        const num = Math.abs(nums[i]);
        const idx = num - 1;
        
        // If the number at idx is positive, mark it as seen (negate it)
        if (nums[idx] > 0) {
            nums[idx] = -nums[idx];
        }
    }
    
    // Step 2: Any index with positive value means (idx+1) is missing
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    
    return result;
};
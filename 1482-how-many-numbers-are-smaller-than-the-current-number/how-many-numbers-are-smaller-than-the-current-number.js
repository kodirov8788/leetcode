/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    // Create sorted version (ascending)
    const sorted = [...nums].sort((a, b) => a - b);
    
    // Map each unique number to its first occurrence index (count of smaller numbers)
    const rankMap = new Map();
    for (let i = 0; i < sorted.length; i++) {
        if (!rankMap.has(sorted[i])) {
            rankMap.set(sorted[i], i);
        }
    }
    
    // For each original number, get how many are smaller
    return nums.map(num => rankMap.get(num));
};
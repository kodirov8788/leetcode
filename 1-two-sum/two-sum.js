/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const numIndices = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numIndices.hasOwnProperty(complement)) {
            return [numIndices[complement], i];
        }
        numIndices[nums[i]] = i;
    }
    // Problem guarantees only one solution exists, so no need for a default return
}
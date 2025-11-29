/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
    let totalSum = 0;
    for (let num of nums) {
        totalSum += num;
    }

    let remainder = totalSum % k;
    
    // If already divisible by k
    if (remainder === 0) return 0;

    // We need to subtract a total of X from the array
    // where X is the smallest number such that (remainder - X) % k === 0
    // i.e., X ≡ remainder (mod k) and 0 ≤ X ≤ remainder
    // The smallest positive X is remainder itself
    // The next possible is remainder + k, but that's larger

    // So the minimum total subtractions is remainder
    // Because we can always subtract 1 from some elements (each element >=1)
    return remainder;
};
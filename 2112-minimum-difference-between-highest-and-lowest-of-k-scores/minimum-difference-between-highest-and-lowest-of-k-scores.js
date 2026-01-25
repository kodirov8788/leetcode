

function minimumDifference(nums, k) {
    if (k === 1) return 0;
    
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
    
    let minDiff = Infinity;
    
    // Check every possible window of size k
    for (let i = 0; i <= nums.length - k; i++) {
        const currentDiff = nums[i + k - 1] - nums[i];
        if (currentDiff < minDiff) {
            minDiff = currentDiff;
        }
    }
    
    return minDiff;
}
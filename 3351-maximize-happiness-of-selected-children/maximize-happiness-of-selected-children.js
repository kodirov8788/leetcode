/**
 * @param {number[]} happiness
 * @param {number} k
 * @return {number}
 */
var maximumHappinessSum = function(happiness, k) {
    // Sort in descending order
    happiness.sort((a, b) => b - a);
    
    let sum = 0;
    for (let i = 0; i < k; i++) {
        // After i turns, this child has been decremented i times
        const current = happiness[i] - i;
        if (current <= 0) {
            // No point in picking more, all remaining will be <= 0
            break;
        }
        sum += current;
    }
    return sum;
};
/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
var maxRunTime = function(n, batteries) {
    let left = 0;
    let right = Math.floor(batteries.reduce((a, b) => a + b, 0) / n) + 1;

    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2); // bias toward higher

        let totalCapacity = 0;
        for (const b of batteries) {
            totalCapacity += Math.min(b, mid);
            if (totalCapacity >= mid * n) break; // early exit optimization
        }

        if (totalCapacity >= mid * n) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }

    return left;
};
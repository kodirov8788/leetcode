
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    
    for (let i = 0; i < m; i++) {
        // Binary search to find the first negative in this row
        let left = 0;
        let right = n - 1;
        let firstNegative = n; // if no negative, all n elements are non-negative
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (grid[i][mid] < 0) {
                firstNegative = mid;
                right = mid - 1; // look for earlier negatives
            } else {
                left = mid + 1;
            }
        }
        
        count += n - firstNegative;
    }
    
    return count;
};

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function(row, col, cells) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // Check if on day 'mid' (0-based, meaning mid+1 cells flooded) we can still cross
    function canCross(mid) {
        // Create a fresh grid: 0 = land, 1 = water
        const grid = Array.from({ length: row }, () => Array(col).fill(0));
        
        // Flood the first (mid + 1) cells
        for (let i = 0; i <= mid; i++) {
            const [r, c] = cells[i];
            grid[r - 1][c - 1] = 1; // 1-based to 0-based
        }
        
        // BFS from all top row land cells
        const queue = [];
        const visited = Array.from({ length: row }, () => Array(col).fill(false));
        
        for (let c = 0; c < col; c++) {
            if (grid[0][c] === 0) { // land on top row
                queue.push([0, c]);
                visited[0][c] = true;
            }
        }
        
        while (queue.length > 0) {
            const [r, c] = queue.shift();
            
            // If we reached the bottom row, we can cross
            if (r === row - 1) {
                return true;
            }
            
            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                
                if (nr >= 0 && nr < row && nc >= 0 && nc < col &&
                    grid[nr][nc] === 0 && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
        
        return false;
    }
    
    // Binary search for the last day we can cross
    let left = 0;
    let right = row * col - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canCross(mid)) {
            result = mid;       // possible, try later days
            left = mid + 1;
        } else {
            right = mid - 1;    // not possible, try earlier
        }
    }
    
    // Result is 0-based day index, but the problem uses 1-based day numbering
    // Day 0: no flooding
    // Day 1: first cell flooded → corresponds to mid = 0
    // So result + 1? No: the output is the day number when flooding happens.
    // Actually: after 'd' floodings (day d), we check if still possible.
    // The last day we can cross is the largest d such that after d floodings, path exists.
    // But the problem says: "on the ith day" → cell i becomes water → so day i means after i-th flooding.
    // And we return the day number (1-based) of the last flooding after which path still exists.
    // But actually: the output is the day index (1-based) up to which path exists.
    // Let's see example:
    // Example 1: cells = [[1,1],[2,1],[1,2],[2,2]]
    // Output: 2 → meaning after day 2 (two cells flooded), still possible → day 2 is answer.
    // So if mid = 1 (two cells flooded: index 0 and 1), canCross(1) = true → answer = 2
    return result + 1;
};
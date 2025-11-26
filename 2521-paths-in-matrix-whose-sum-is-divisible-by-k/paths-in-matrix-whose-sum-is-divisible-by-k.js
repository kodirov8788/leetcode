const numberOfPaths = function(grid, k) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;
    
    // dp[i][j][r] -> but we optimize to dp[j][r] = ways to reach (i,j) with sum % k == r
    // We'll use two arrays: prevRow and currRow
    let prevRow = Array(n).fill().map(() => Array(k).fill(0));
    
    // Initialize starting point (0,0)
    prevRow[0][grid[0][0] % k] = 1;
    
    // Fill first row (can only come from left)
    for (let j = 1; j < n; j++) {
        const val = grid[0][j];
        for (let r = 0; r < k; r++) {
            if (prevRow[j-1][r] > 0) {
                const newRemainder = (r + val) % k;
                prevRow[j][newRemainder] = (prevRow[j][newRemainder] + prevRow[j-1][r]) % MOD;
            }
        }
    }
    
    // Now process each row from 1 to m-1
    for (let i = 1; i < m; i++) {
        let currRow = Array(n).fill().map(() => Array(k).fill(0));
        
        // For each cell in current row
        for (let j = 0; j < n; j++) {
            const val = grid[i][j];
            const add = val % k;
            
            for (let r = 0; r < k; r++) {
                let ways = 0;
                
                // Can come from above (i-1, j)
                if (j < n) {
                    ways = (ways + prevRow[j][r]) % MOD;
                }
                
                // Can come from left (i, j-1) — only if j > 0
                if (j > 0) {
                    ways = (ways + currRow[j-1][r]) % MOD;
                }
                
                if (ways > 0) {
                    const newR = (r + add) % k;
                    currRow[j][newR] = (currRow[j][newR] + ways) % MOD;
                }
            }
        }
        
        prevRow = currRow;
    }
    
    // Answer is number of ways to reach (m-1, n-1) with sum % k == 0
    return prevRow[n-1][0];
};
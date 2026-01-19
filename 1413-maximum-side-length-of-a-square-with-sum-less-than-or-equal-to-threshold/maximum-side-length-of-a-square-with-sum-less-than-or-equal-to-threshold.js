
function maxSideLength(mat, threshold) {
    if (!mat || !mat.length || !mat[0].length) return 0;

    const m = mat.length;
    const n = mat[0].length;

    // Step 1: Build 2D prefix sum
    // prefix[i+1][j+1] = sum of rectangle from (0,0) to (i,j) inclusive
    const prefix = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefix[i][j] = 
                prefix[i-1][j] + 
                prefix[i][j-1] - 
                prefix[i-1][j-1] + 
                mat[i-1][j-1];
        }
    }

    // Helper: get sum of submatrix from (r1,c1) to (r2,c2) inclusive (0-based)
    function getSum(r1, c1, r2, c2) {
        return prefix[r2+1][c2+1] 
             - prefix[r2+1][c1] 
             - prefix[r1][c2+1] 
             + prefix[r1][c1];
    }

    // Step 2: Binary search on possible side length
    let left = 0;
    let right = Math.min(m, n) + 1;   // side length from 0 to min(m,n)

    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);  // upper mid

        // Check if there exists any square of side mid with sum <= threshold
        let possible = false;

        for (let i = 0; i <= m - mid; i++) {
            for (let j = 0; j <= n - mid; j++) {
                const sum = getSum(i, j, i + mid - 1, j + mid - 1);
                if (sum <= threshold) {
                    possible = true;
                    break;
                }
            }
            if (possible) break;
        }

        if (possible) {
            left = mid;      // try larger
        } else {
            right = mid - 1; // must be smaller
        }
    }

    return left;
}
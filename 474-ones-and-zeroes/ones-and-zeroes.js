/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    for (let str of strs) {
        let zeros = 0;
        let ones = 0;
        for (let char of str) {
            if (char === '0') zeros++;
            else ones++;
        }
        
        for (let j = m; j >= zeros; j--) {
            for (let k = n; k >= ones; k--) {
                dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1);
            }
        }
    }
    
    return dp[m][n];
};
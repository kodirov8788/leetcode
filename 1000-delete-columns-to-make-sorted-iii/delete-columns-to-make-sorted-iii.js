/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    const n = strs.length;
    const m = strs[0].length;
    const dp = new Array(m).fill(1);
    for (let j = 1; j < m; j++) {
        for (let i = 0; i < j; i++) {
            let canExtend = true;
            for (let r = 0; r < n; r++) {
                if (strs[r][i] > strs[r][j]) {
                    canExtend = false;
                    break;
                }
            }
            if (canExtend) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }
    const maxKeep = Math.max(...dp);
    return m - maxKeep;
};
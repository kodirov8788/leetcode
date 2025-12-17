/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */



function maximumProfit(prices, k) {
    const n = prices.length;
    const dp = Array.from({ length: k + 1 }, () =>
        Array.from({ length: n + 1 }, () =>
            Array(3).fill(-Infinity)
        )
    );
    dp[0][0][0] = 0;

    for (let d = 1; d <= n; d++) {
        for (let kk = 0; kk <= k; kk++) {
            // State 0: not holding
            dp[kk][d][0] = dp[kk][d - 1][0];
            dp[kk][d][0] = Math.max(dp[kk][d][0], dp[kk][d - 1][1] + prices[d - 1]);
            dp[kk][d][0] = Math.max(dp[kk][d][0], dp[kk][d - 1][2] - prices[d - 1]);

            // State 1: holding long
            dp[kk][d][1] = dp[kk][d - 1][1];
            if (kk >= 1) {
                dp[kk][d][1] = Math.max(dp[kk][d][1], dp[kk - 1][d - 1][0] - prices[d - 1]);
            }

            // State 2: holding short
            dp[kk][d][2] = dp[kk][d - 1][2];
            if (kk >= 1) {
                dp[kk][d][2] = Math.max(dp[kk][d][2], dp[kk - 1][d - 1][0] + prices[d - 1]);
            }
        }
    }

    let maxProfit = -Infinity;
    for (let kk = 0; kk <= k; kk++) {
        maxProfit = Math.max(maxProfit, dp[kk][n][0]);
    }
    return maxProfit;
}
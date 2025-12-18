/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
function maxProfit(prices, strategy, k) {
    const n = prices.length;
    const m = k / 2;
    const prefixP = new Array(n + 1).fill(0);
    const prefixSP = new Array(n + 1).fill(0);
    const sp = new Array(n);
    for (let i = 0; i < n; i++) {
        sp[i] = strategy[i] * prices[i];
        prefixP[i + 1] = prefixP[i] + prices[i];
        prefixSP[i + 1] = prefixSP[i] + sp[i];
    }
    let orig = prefixSP[n];
    let maxDelta = 0;
    for (let l = 0; l <= n - k; l++) {
        const r = l + k - 1;
        const mid = l + m;
        const sumPSecond = prefixP[r + 1] - prefixP[mid];
        const sumSPWindow = prefixSP[r + 1] - prefixSP[l];
        const delta = sumPSecond - sumSPWindow;
        if (delta > maxDelta) maxDelta = delta;
    }
    return orig + maxDelta;
}
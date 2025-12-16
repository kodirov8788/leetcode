/**
 * @param {number} n
 * @param {number[]} present  // 0-based: present[0] for employee 1, etc.
 * @param {number[]} future
 * @param {number[][]} hierarchy
 * @param {number} budget
 * @return {number}
 */
function maxProfit(n, present, future, hierarchy, budget) {
    // build tree: children lists (1-based)
    const children = Array.from({length: n+1}, () => []);
    for (const [u, v] of hierarchy) {
        children[u].push(v);
    }

    // precompute costs and profits
    const full = new Array(n+1);
    const half = new Array(n+1);
    const profitFull = new Array(n+1);
    const profitHalf = new Array(n+1);

    for (let i = 1; i <= n; i++) {
        full[i] = present[i-1];
        half[i] = Math.floor(present[i-1] / 2);
        profitFull[i] = future[i-1] - full[i];
        profitHalf[i] = future[i-1] - half[i];
    }

    // dp[u][pb ? 1:0][c] = max profit
    const dp = Array.from({length: n+1}, () => [
        new Array(budget + 1).fill(Number.NEGATIVE_INFINITY),
        new Array(budget + 1).fill(Number.NEGATIVE_INFINITY)
    ]);

    function dfs(u, parentBought) {
        const pb = parentBought ? 1 : 0;
        // If already computed, return. Check if dp[u][pb][0] !== -Inf, but since we set after, and tree, it's called once per.
        // But to be safe:
        if (dp[u][pb][0] !== Number.NEGATIVE_INFINITY) return;

        const costBuy = parentBought ? half[u] : full[u];
        const profBuy = parentBought ? profitHalf[u] : profitFull[u];

        // ---- case 1: u does NOT buy ----
        let noBuy = new Array(budget + 1).fill(Number.NEGATIVE_INFINITY);
        noBuy[0] = 0;

        for (const v of children[u]) {
            dfs(v, false); // no discount from u
            const nextNo = new Array(budget + 1).fill(Number.NEGATIVE_INFINITY);
            for (let s = 0; s <= budget; s++) {
                if (noBuy[s] === Number.NEGATIVE_INFINITY) continue;
                for (let add = 0; add <= budget - s; add++) {
                    if (dp[v][0][add] !== Number.NEGATIVE_INFINITY) {
                        nextNo[s + add] = Math.max(nextNo[s + add], noBuy[s] + dp[v][0][add]);
                    }
                }
            }
            noBuy = nextNo;
        }

        // ---- case 2: u buys (if possible) ----
        let yesBuy = new Array(budget + 1).fill(Number.NEGATIVE_INFINITY);
        if (costBuy <= budget) {
            let currYes = new Array(budget + 1).fill(Number.NEGATIVE_INFINITY);
            currYes[costBuy] = profBuy;

            for (const v of children[u]) {
                dfs(v, true); // child can get discount
                const nextYes = new Array(budget + 1).fill(Number.NEGATIVE_INFINITY);
                for (let s = 0; s <= budget; s++) {
                    if (currYes[s] === Number.NEGATIVE_INFINITY) continue;
                    for (let add = 0; add <= budget - s; add++) {
                        if (dp[v][1][add] !== Number.NEGATIVE_INFINITY) {
                            nextYes[s + add] = Math.max(nextYes[s + add], currYes[s] + dp[v][1][add]);
                        }
                    }
                }
                currYes = nextYes;
            }
            yesBuy = currYes;
        }

        // combine
        for (let c = 0; c <= budget; c++) {
            dp[u][pb][c] = Math.max(noBuy[c], yesBuy[c]);
        }
    }

    dfs(1, false); // root has no parent → no discount possible for root

    let answer = Number.NEGATIVE_INFINITY;
    for (let c = 0; c <= budget; c++) {
        answer = Math.max(answer, dp[1][0][c]);
    }
    return answer;
}
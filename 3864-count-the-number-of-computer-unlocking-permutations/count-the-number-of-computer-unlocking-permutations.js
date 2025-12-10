/**
 * @param {number[]} complexity
 * @return {number}
 */
function countPermutations(complexity) {
    const n = complexity.length;
    const MOD = 1000000007n;
    const root = complexity[0];

    for (let i = 1; i < n; i++) {
        if (complexity[i] <= root) {
            return 0;
        }
    }

    let fact = 1n;
    for (let i = 1; i < n; i++) {
        fact = (fact * BigInt(i)) % MOD;
    }

    return Number(fact);
}
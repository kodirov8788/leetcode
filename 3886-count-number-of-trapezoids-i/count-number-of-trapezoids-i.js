/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    const MOD = 1000000007;

    // Step 1: Count frequency of each y-coordinate
    const freqMap = new Map();
    for (const [x, y] of points) {
        freqMap.set(y, (freqMap.get(y) || 0) + 1);
    }

    // Step 2: Collect all C(count, 2) for rows with >=2 points
    let sumComb = 0;        // Σ C(f,2)
    let sumSqComb = 0;      // Σ C(f,2)²

    for (const count of freqMap.values()) {
        if (count < 2) continue;
        const comb = (count * (count - 1)) / 2;
        sumComb = (sumComb + comb) % MOD;
        // comb * comb may overflow → use BigInt temporarily or safe mul
        const comb64 = BigInt(comb);
        sumSqComb = (sumSqComb + Number(comb64 * comb64 % BigInt(MOD))) % MOD;
    }

    // Step 3: Total = (sumComb² - sumSqComb) / 2   modulo MOD
    const sumCombBig = BigInt(sumComb);
    let total = (sumCombBig * sumCombBig % BigInt(MOD));
    total = (total - BigInt(sumSqComb) + BigInt(MOD)) % BigInt(MOD); // +MOD to prevent negative
    total = total * BigInt(500000004) % BigInt(MOD); // divide by 2 → multiply by modular inverse of 2

    return Number(total);
};
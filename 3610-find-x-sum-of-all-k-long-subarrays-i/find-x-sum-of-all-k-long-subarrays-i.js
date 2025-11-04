/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findXSum(nums, k, x) {
  const n = nums.length;
  const res = [];

  for (let i = 0; i <= n - k; i++) {
    const window = nums.slice(i, i + k);

    // Step 1: Count frequencies
    const freq = {};
    for (const num of window) {
      freq[num] = (freq[num] || 0) + 1;
    }

    // Step 2: Sort by frequency desc, then value desc
    const sorted = Object.entries(freq)
      .map(([num, count]) => [Number(num), count])
      .sort((a, b) => b[1] - a[1] || b[0] - a[0]);

    // Step 3: Take top x unique numbers
    const topX = new Set(sorted.slice(0, x).map(([num]) => num));

    // Step 4: Sum all occurrences of these numbers in the window
    let sum = 0;
    for (const num of window) {
      if (topX.has(num)) sum += num;
    }

    res.push(sum);
  }

  return res;
}

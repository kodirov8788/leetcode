/**
 * @param {number[]} nums
 * @return {number[]}
 */
function getSneakyNumbers(nums) {
  const count = new Map();
  const res = [];

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
    if (count.get(num) === 2) res.push(num);
  }

  return res;
}
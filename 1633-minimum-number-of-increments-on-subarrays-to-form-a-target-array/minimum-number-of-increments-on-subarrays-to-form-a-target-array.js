/**
 * @param {number[]} target
 * @return {number}
 */
function minNumberOperations(target) {
  if (target.length === 0) return 0;

  let ops = target[0];
  for (let i = 1; i < target.length; i++) {
    if (target[i] > target[i - 1]) {
      ops += target[i] - target[i - 1];
    }
  }
  return ops;
}
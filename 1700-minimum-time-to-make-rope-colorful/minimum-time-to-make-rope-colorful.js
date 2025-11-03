/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
function minCost(colors, neededTime) {
  if (typeof colors !== "string" || !Array.isArray(neededTime))
    throw new TypeError("Invalid input types");
  if (colors.length !== neededTime.length)
    throw new Error("colors and neededTime must have the same length");

  const n = colors.length;
  let totalTime = 0;

  for (let i = 1; i < n; i++) {
    // if two consecutive balloons are same color
    if (colors[i] === colors[i - 1]) {
      // remove the one with smaller time
      const minTime = Math.min(neededTime[i], neededTime[i - 1]);
      totalTime += minTime;
      // keep the one with higher time for future comparisons
      neededTime[i] = Math.max(neededTime[i], neededTime[i - 1]);
    }
  }

  return totalTime;
}

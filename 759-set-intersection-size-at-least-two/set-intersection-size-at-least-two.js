/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function(intervals) {
     intervals.sort((a, b) => a[1] - b[1]);
  let chosen = new Set();
  let chosenList = [];
  for (let interval of intervals) {
    let start = interval[0], end = interval[1];
    let count = 0;
    for (let p of chosenList) {
      if (p >= start && p <= end) count++;
    }
    let need = 2 - count;
    let pos = end;
    while (need > 0) {
      while (pos >= start && chosen.has(pos)) {
        pos--;
      }
      if (pos < start) break;
      chosen.add(pos);
      chosenList.push(pos);
      need--;
      pos--;
    }
  }
  return chosen.size;
};

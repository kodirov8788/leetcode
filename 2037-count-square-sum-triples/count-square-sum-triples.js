/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function(n) {
    let count = 0;
    for (let a = 1; a <= n; a++) {
        for (let b = 1; b <= n; b++) {
            const cSquared = a * a + b * b;
            const c = Math.floor(Math.sqrt(cSquared));
            if (c * c === cSquared && c >= 1 && c <= n) {
                count++;
            }
        }
    }
    return count;
};
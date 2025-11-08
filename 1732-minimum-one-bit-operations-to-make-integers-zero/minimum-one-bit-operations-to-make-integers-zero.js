/**
 * @param {number} n
 * @return {number}
 */
var minimumOneBitOperations = function(n) {
    let res = n;
    while (n > 0) {
        n >>= 1;
        res ^= n;
    }
    return res;
};
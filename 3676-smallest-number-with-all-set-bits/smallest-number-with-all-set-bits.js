/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function(n) {

    let k = 1;
    while (true) {
        let x = (1 << k) - 1; // 2^k - 1, e.g., 3, 7, 15, 31, etc.
        if (x >= n) return x;
        k++;
    }

};
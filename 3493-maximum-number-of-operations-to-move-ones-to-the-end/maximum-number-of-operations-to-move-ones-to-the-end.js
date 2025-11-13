/**
 * @param {string} s
 * @return {number}
 */
function maxOperations(s) {
    let total = 0;
    let ones = 0;
    let inZero = false;
    for (let char of s) {
        if (char === '1') {
            ones++;
            inZero = false;
        } else {
            if (!inZero && ones > 0) {
                total += ones;
                inZero = true;
            }
        }
    }
    return total;
}
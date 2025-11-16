/**
 * @param {string} s
 * @return {number}
 */
var numSub = function(s) {
    const MOD = 1000000007n;
    let ans = 0n;
    let i = 0;
    let n = s.length;
    while (i < n) {
        if (s[i] === '0') {
            i++;
            continue;
        }
        let j = i;
        while (j < n && s[j] === '1') {
            j++;
        }
        let k = j - i;
        let bk = BigInt(k);
        ans = (ans + (bk * (bk + 1n)) / 2n) % MOD;
        i = j;
    }
    return Number(ans);
};
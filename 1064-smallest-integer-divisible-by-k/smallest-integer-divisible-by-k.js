/**
 * @param {number} k
 * @return {number}
 */
var smallestRepunitDivByK = function(k) {
    if (k === 0) return -1; // though k >= 1 by constraints
    
    // We are looking for the smallest length len such that
    // 111...1 (len ones) ≡ 0 (mod k)
    // which is equivalent to (10^len - 1)/9 ≡ 0 (mod k)
    // but easier: track the remainder of the current repunit modulo k
    
    let remainder = 0;
    
    // We can have at most k different remainders (0 to k-1)
    // If we see a remainder twice, we are in a cycle and will never reach 0
    const seen = new Set();
    
    for (let len = 1; len <= k; len++) {
        // Adding one more '1' is equivalent to:
        // new_number = old_number * 10 + 1
        // so new_remainder = (old_remainder * 10 + 1) % k
        remainder = (remainder * 10 + 1) % k;
        
        if (remainder === 0) {
            return len;          // found the smallest length
        }
        
        // If we have seen this remainder before → cycle → impossible
        if (seen.has(remainder)) {
            return -1;
        }
        seen.add(remainder);
    }
    
    // After k steps we must have repeated a remainder (pigeonhole principle)
    // so if we didn't find a solution yet, it's impossible
    return -1;
};
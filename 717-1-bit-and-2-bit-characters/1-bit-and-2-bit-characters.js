var isOneBitCharacter = function(bits) {
    let i = 0;
    const n = bits.length;

    while (i < n - 1) {
        if (bits[i] === 1) {
            i += 2;  // 10 or 11 → two-bit character
        } else {
            i += 1;  // 0 → one-bit character
        }
    }

    return i === n - 1;
};
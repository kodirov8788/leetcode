var countOdds = function(low, high) {
    const upTo = (n) => n < 0 ? 0 : Math.floor((n + 1) / 2);
    return upTo(high) - upTo(low - 1);
};
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function(fn, args, t) {
    // Record results for LeetCode's test simulation
    const results = [];
    const start = Date.now();

    // Call immediately
    results.push({ time: 0, returned: fn(...args) });

    // Schedule repeated calls
    const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        results.push({ time: elapsed, returned: fn(...args) });
    }, t);

    // Return cancel function
    const cancelFn = () => {
        clearInterval(interval);
    };

    // For local test convenience
    cancelFn.results = results;
    return cancelFn;
};

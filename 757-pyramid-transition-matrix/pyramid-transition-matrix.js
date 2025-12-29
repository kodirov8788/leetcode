

/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function(bottom, allowed) {
    // Build lookup: map[left][right] = Set of possible tops
    const map = Array.from({length: 7}, () => Array.from({length: 7}, () => new Set()));
    const A = 'A'.charCodeAt(0);
    
    for (const pat of allowed) {
        const left = pat.charCodeAt(0) - A;
        const right = pat.charCodeAt(1) - A;
        const top = pat.charCodeAt(2) - A;
        map[left][right].add(top);
    }
    
    // Recursive check: can we reach length 1 starting from current row?
    const dfs = (curr) => {
        if (curr.length === 1) return true;
        
        // Build all possible next rows
        const nextPoss = [];
        const build = (pos, builder) => {
            if (pos === curr.length - 1) {
                nextPoss.push(builder.join(''));
                return;
            }
            const l = curr.charCodeAt(pos) - A;
            const r = curr.charCodeAt(pos + 1) - A;
            for (const t of map[l][r]) {
                builder.push(String.fromCharCode(A + t));
                build(pos + 1, builder);
                builder.pop();
            }
        };
        
        build(0, []);
        
        for (const nxt of nextPoss) {
            if (dfs(nxt)) return true;
        }
        return false;
    };
    
    return dfs(bottom);
};
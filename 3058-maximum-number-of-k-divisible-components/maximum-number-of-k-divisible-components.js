
var maxKDivisibleComponents = function(n, edges, values, k) {
    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    let componentCount = 0;

    // DFS returns the sum of the subtree rooted at node (mod k is enough, but we return full sum for simplicity)
    function dfs(node, parent) {
        let total = values[node];

        for (const child of adj[node]) {
            if (child === parent) continue;

            const childSum = dfs(child, node);
            total += childSum;

            // If the child's subtree sum is divisible by k, we can cut this edge
            if (childSum % k === 0) {
                componentCount++;
            }
        }

        return total;
    }

    // Start DFS from node 0 (any root works)
    dfs(0, -1);

    // Always count the root component (the remaining part after cutting)
    return componentCount + 1;
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function(root) {
    const MOD = 1000000007n;
    let totalSum = 0n;
    let maxActualProduct = 0n;  // Track the true large product for accurate comparison

    // Compute total sum
    const sumTree = (node) => {
        if (!node) return 0n;
        return BigInt(node.val) + sumTree(node.left) + sumTree(node.right);
    };
    totalSum = sumTree(root);

    // DFS: compute subtree sums and update max product
    const dfs = (node) => {
        if (!node) return 0n;

        const left = dfs(node.left);
        const right = dfs(node.right);
        const sub = BigInt(node.val) + left + right;

        const complement = totalSum - sub;
        const actualProduct = sub * complement;  // No modulo here → exact value

        if (actualProduct > maxActualProduct) {
            maxActualProduct = actualProduct;
        }

        return sub;
    };

    dfs(root);

    // Apply modulo only at the very end
    return Number(maxActualProduct % MOD);
};
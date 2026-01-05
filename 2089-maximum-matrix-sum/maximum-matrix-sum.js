
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function(matrix) {
    let n = matrix.length;
    let total = 0;
    let minAbs = Infinity;
    let negCount = 0;

    // Step 1: Compute absolute sum and count negatives
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let val = Math.abs(matrix[i][j]); // treat as positive
            total += val;
            minAbs = Math.min(minAbs, val);

            if (matrix[i][j] < 0) negCount++;
        }
    }

    // Step 2: If even number of negatives → can make all positive → return total sum of absolutes
    if (negCount % 2 === 0) {
        return total;
    }

    // Step 3: Odd number of negatives → one negative must remain
    // The best we can do is to leave the smallest absolute value as negative
    // (i.e., subtract twice that smallest absolute value from the total)
    return total - 2 * minAbs;
};
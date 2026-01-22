/**
 * @param {number[]} nums
 * @return {number}
 */
function minimumPairRemoval(nums) {
    let arr = [...nums];
    let ops = 0;

    while (arr.length > 1 && !isNonDecreasing(arr)) {
        // Find index of leftmost minimum-sum pair
        const idx = arr
            .slice(0, -1)
            .map((v, i) => [v + arr[i + 1], i])
            .sort((a, b) => a[0] - b[0] || a[1] - b[1])[0][1];

        // Merge
        arr[idx] += arr[idx + 1];
        arr.splice(idx + 1, 1);
        ops++;
    }

    return ops;
}

function isNonDecreasing(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}
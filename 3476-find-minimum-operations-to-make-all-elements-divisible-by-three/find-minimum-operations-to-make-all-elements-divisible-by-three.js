var minimumOperations = function(nums) {
    let ops = 0;
    for (let num of nums) {
        let rem = num % 3;
        if (rem === 1) {
            ops += 1;           // num-1 → divisible by 3
        } else if (rem === 2) {
            ops += 1;           // num-1 or num+1 both work, cost 1
        }
        // rem === 0 → already divisible, cost 0
    }
    return ops;
};
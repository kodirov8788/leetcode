var maxSumDivThree = function(nums) {
    let dp = [0, 0, 0]; // We'll track the best sum for remainder 0,1,2

    for (let num of nums) {
        let temp = [...dp]; // copy current state

        for (let i = 0; i < 3; i++) {
            let newRemainder = (temp[i] + num) % 3;
            dp[newRemainder] = Math.max(dp[newRemainder], temp[i] + num);
        }
    }

    return dp[0];
};
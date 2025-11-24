/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(nums) {
    const n = nums.length;
    const answer = new Array(n);
    let current = 0;
    for (let i = 0; i < n; i++) {
        current = (current * 2 + nums[i]) % 5;
        answer[i] = current === 0;
    }
    return answer;
};
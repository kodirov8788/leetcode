/**
 * @param {number[]} nums
 * @return {number}
 */
function minOperations(nums) {
    let ans = 0;
    const stack = [0];
    for (let num of nums) {
        while (stack.length && stack[stack.length - 1] > num) {
            stack.pop();
        }
        if (!stack.length || stack[stack.length - 1] < num) {
            ans++;
            stack.push(num);
        }
    }
    return ans;
}
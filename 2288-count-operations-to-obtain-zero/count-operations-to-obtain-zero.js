/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
function countOperations(num1, num2) {
    if (num1 === 0 || num2 === 0) return 0;
    if (num1 >= num2) {
        return Math.floor(num1 / num2) + countOperations(num1 % num2, num2);
    } else {
        return Math.floor(num2 / num1) + countOperations(num1, num2 % num1);
    }
}
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits.length) return [];
    
    const phone = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    let result = [];
    
    function backtrack(combination, next_digits) {
        if (next_digits.length === 0) {
            result.push(combination);
        } else {
            let letters = phone[next_digits[0]];
            for (let i = 0; i < letters.length; i++) {
                backtrack(combination + letters[i], next_digits.slice(1));
            }
        }
    }
    
    backtrack("", digits);
    return result;
};
/**
 * Generates all combinations of well-formed parentheses for n pairs.
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    const result = [];

    function backtrack(curr, open, close) {
        if (curr.length === n * 2) {
            result.push(curr);
            return;
        }
        if (open < n) {
            backtrack(curr + '(', open + 1, close);
        }
        if (close < open) {
            backtrack(curr + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

// --- Test cases ---

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    a = [...a].sort();
    b = [...b].sort();
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function test() {
    const tests = [
        {
            n: 1,
            expected: ["()"]
        },
        {
            n: 2,
            expected: ["(())", "()()"]
        },
        {
            n: 3,
            expected: ["((()))","(()())","(())()","()(())","()()()"]
        },
        {
            n: 4,
            expected: [
                "(((())))", "((()()))", "((())())", "((()))()",
                "(()(()))", "(()()())", "(()())()", "(())(())",
                "(())()()", "()((()))", "()(()())", "()(())()",
                "()()(())", "()()()()"
            ]
        }
    ];

    let allPassed = true;
    for (const { n, expected } of tests) {
        const output = generateParenthesis(n);
        const pass = arraysEqual(output, expected);
        console.log(`n = ${n}:`, pass ? 'PASS' : 'FAIL');
        if (!pass) {
            console.log('Expected:', expected);
            console.log('Got     :', output);
            allPassed = false;
        }
    }
    if (allPassed) {
        console.log("All tests passed!");
    } else {
        console.log("Some tests failed.");
    }
}

if (require.main === module) {
    test();
}
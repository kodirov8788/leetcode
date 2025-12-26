

/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function(customers) {
    const n = customers.length;
    
    // prefixY[i] = number of 'Y' in customers[0..i-1]
    const prefixY = new Array(n + 1).fill(0);
    // prefixN[i] = number of 'N' in customers[0..i-1]
    const prefixN = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefixY[i + 1] = prefixY[i] + (customers[i] === 'Y' ? 1 : 0);
        prefixN[i + 1] = prefixN[i] + (customers[i] === 'N' ? 1 : 0);
    }
    
    const totalY = prefixY[n];
    
    let minPenalty = Infinity;
    let bestHour = -1;
    
    // try closing at hour j (j from 0 to n inclusive)
    for (let j = 0; j <= n; j++) {
        const penalty = prefixN[j] + (totalY - prefixY[j]);
        
        if (penalty < minPenalty) {
            minPenalty = penalty;
            bestHour = j;
        }
        // if penalty is equal, we keep the current bestHour (earliest one)
    }
    
    return bestHour;
};
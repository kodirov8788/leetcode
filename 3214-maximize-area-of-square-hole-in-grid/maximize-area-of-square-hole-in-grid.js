
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    const getMaxStreak = (bars) => {
        if (bars.length === 0) return 0;
        bars.sort((a, b) => a - b);
        let maxStreak = 1;
        let currentStreak = 1;
        for (let i = 1; i < bars.length; i++) {
            if (bars[i] === bars[i - 1] + 1) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 1;
            }
        }
        return maxStreak;
    };

    const maxH = getMaxStreak(hBars) + 1;
    const maxV = getMaxStreak(vBars) + 1;
    const side = Math.min(maxH, maxV);
    return side * side;
};
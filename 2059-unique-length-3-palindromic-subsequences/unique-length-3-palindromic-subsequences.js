var countPalindromicSubsequence = function(s) {
    const n = s.length;
    const first = Array(26).fill(n);
    const last = Array(26).fill(-1);
    
    // Record first and last occurrence of each character
    for (let i = 0; i < n; i++) {
        const idx = s.charCodeAt(i) - 97; // 'a' -> 0
        if (first[idx] === n) {
            first[idx] = i;
        }
        last[idx] = i;
    }
    
    let ans = 0;
    
    // For each possible middle character
    for (let mid = 0; mid < 26; mid++) {
        if (first[mid] === n || last[mid] === -1) continue; // char doesn't exist
        
        const left = first[mid];
        const right = last[mid];
        
        if (right - left < 2) continue; // need at least one char between them
        
        // Count unique characters strictly between left and right positions
        const seen = new Set();
        for (let i = left + 1; i < right; i++) {
            seen.add(s[i]);
        }
        
        ans += seen.size;
    }
    
    return ans;
};
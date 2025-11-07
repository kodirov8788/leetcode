/**
 * @param {number[]} stations
 * @param {number} r
 * @param {number} k
 * @return {number}
 */
var maxPower = function(stations, r, k) {
    const n = stations.length;

    // prefix sum of stations for computing initial power quickly
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stations[i];

    // compute initial power of each city (sum of stations in [i-r, i+r])
    const power = new Array(n);
    for (let i = 0; i < n; i++) {
        const left = Math.max(0, i - r);
        const right = Math.min(n - 1, i + r);
        power[i] = prefix[right + 1] - prefix[left];
    }

    // binary search bounds:
    // minimum possible = 0, maximum possible <= totalStations + k
    const totalStations = prefix[n];
    let low = 0, high = totalStations + k, ans = 0;

    const can = (target) => {
        // diff array where diff[pos] = number of stations we placed at pos
        const diff = new Array(n).fill(0);
        let windowAdd = 0; // sum of placed stations that currently affect city i
        let used = 0;

        for (let i = 0; i < n; i++) {
            // When i advances, some placed stations stop affecting city i once
            // their rightmost influenced city < i. We placed at positions p,
            // each such placed station affects cities up to p + r.
            // The placement index that stops affecting i is index (i - r - 1).
            if (i - r - 1 >= 0) {
                windowAdd -= diff[i - r - 1];
            }

            const cur = power[i] + windowAdd;
            if (cur < target) {
                const need = target - cur;
                used += need;
                if (used > k) return false;
                // place those need stations at pos so they affect current city i:
                // greedy place at pos = min(n-1, i + r)
                const pos = Math.min(n - 1, i + r);
                diff[pos] += need;
                // they immediately affect current and next cities within their window
                windowAdd += need;
            }
        }
        return true;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (can(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
};
var numberOfSubstrings = function(s) {
    const n = s.length;
    const pos = [];
    for (let i = 0; i < n; i++) {
        if (s[i] === '0') pos.push(i);
    }
    const m = pos.length;
    let ans = 0n;
    // z = 0
    if (m === 0) {
        const len = BigInt(n);
        ans += len * (len + 1n) / 2n;
        return Number(ans);
    }
    // before first
    if (pos[0] > 0) {
        const len = BigInt(pos[0]);
        ans += len * (len + 1n) / 2n;
    }
    // between
    for (let j = 0; j < m - 1; j++) {
        const len = BigInt(pos[j + 1] - pos[j] - 1);
        if (len > 0n) ans += len * (len + 1n) / 2n;
    }
    // after last
    if (pos[m - 1] < n - 1) {
        const len = BigInt(n - 1 - pos[m - 1]);
        ans += len * (len + 1n) / 2n;
    }
    // z >= 1
    for (let z = 1; z <= Math.min(m, 200); z++) {
        const zz = BigInt(z);
        const req = zz * zz;
        for (let k = 0; k <= m - z; k++) {
            const first = pos[k];
            const last = pos[k + z - 1];
            const fixed_len = BigInt(last - first + 1);
            const fixed_ones = fixed_len - zz;
            let thresh = req - fixed_ones;
            const left_min = (k === 0 ? 0 : pos[k - 1] + 1);
            const left_max = first;
            let A = BigInt(left_max - left_min);
            const right_max = (k + z === m ? n - 1 : pos[k + z] - 1);
            const right_min = last;
            let B = BigInt(right_max - right_min);
            const total = (A + 1n) * (B + 1n);
            if (thresh <= 0n) {
                ans += total;
                continue;
            }
            const K = thresh - 1n;
            let MM = A < K ? A : K;
            let sum_min = 0n;
            if (K < B) {
                sum_min = (MM + 1n) * K - (MM * (MM + 1n) / 2n);
            } else {
                const split = K - B;
                let num_full = (split < MM ? split : MM) + 1n;
                sum_min += num_full * B;
                const start_el_for_less = split + 1n;
                if (start_el_for_less <= MM) {
                    const num_terms = MM - split;
                    const start_v = K - start_el_for_less;
                    const end_v = K - MM;
                    sum_min += num_terms * (start_v + end_v) / 2n;
                }
            }
            const invalid = sum_min + (MM + 1n);
            ans += total - invalid;
        }
    }
    return Number(ans);
};
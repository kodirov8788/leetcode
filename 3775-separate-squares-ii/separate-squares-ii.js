/**
 * @param {number[][]} squares
 * @return {number}
 */
function separateSquares(squares) {
    if (squares.length === 0) return 0;

    // Coordinate compression for x
    const xSet = new Set();
    for (const [x, y, len] of squares) {
        xSet.add(x);
        xSet.add(x + len);
    }
    const xcoords = Array.from(xSet).sort((a, b) => a - b);
    const xToIdx = new Map(xcoords.map((v, i) => [v, i]));
    const mx = xcoords.length;

    // Events: [y, type (0=start, 1=end), x1, x2]
    const events = [];
    for (const [x, y, len] of squares) {
        events.push([y, 0, x, x + len]);
        events.push([y + len, 1, x, x + len]);
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    // Segment Tree (covered length as number)
    class SegTree {
        constructor(n) {
            this.n = n;
            this.cover = new Array(4 * n).fill(0);
            this.len = new Array(4 * n).fill(0);
        }

        update(ql, qr, val, node = 1, nl = 0, nr = this.n - 2) {
            if (ql > qr) return;

            if (ql === nl && qr === nr) {
                this.cover[node] += val;
            } else {
                const mid = (nl + nr) >>> 1;
                this.update(ql, Math.min(qr, mid), val, node * 2, nl, mid);
                this.update(Math.max(ql, mid + 1), qr, val, node * 2 + 1, mid + 1, nr);
            }

            if (this.cover[node] > 0) {
                this.len[node] = xcoords[nr + 1] - xcoords[nl];
            } else if (nl === nr) {
                this.len[node] = 0;
            } else {
                this.len[node] = this.len[node * 2] + this.len[node * 2 + 1];
            }
        }

        query() {
            return this.len[1];
        }
    }

    // Compute total union area
    const computeTotalUnion = () => {
        if (events.length === 0) return 0;
        const tree = new SegTree(mx);
        let area = 0;
        let prevY = null;
        let i = 0;
        while (i < events.length) {
            const cy = events[i][0];
            if (prevY !== null && cy > prevY) {
                area += tree.query() * (cy - prevY);
            }
            while (i < events.length && events[i][0] === cy) {
                const [, type, x1, x2] = events[i];
                const l = xToIdx.get(x1);
                const r = xToIdx.get(x2) - 1;
                tree.update(l, r, type === 0 ? 1 : -1);
                i++;
            }
            prevY = cy;
        }
        return area;
    };

    const totalUnion = computeTotalUnion();
    const half = totalUnion / 2;

    // Find the minimal y using single sweep (no binary search)
    const tree = new SegTree(mx);
    let cumArea = 0;
    let prevY = null;
    let i = 0;

    while (i < events.length) {
        const cy = events[i][0];

        if (prevY !== null) {
            const covered = tree.query();
            if (covered > 0) {
                const deltaH = cy - prevY;
                const deltaA = covered * deltaH;
                if (cumArea + deltaA >= half) {
                    const needed = half - cumArea;
                    return prevY + needed / covered;
                }
                cumArea += deltaA;
            }
        }

        // Process all events at current y
        while (i < events.length && events[i][0] === cy) {
            const [, type, x1, x2] = events[i];
            const l = xToIdx.get(x1);
            const r = xToIdx.get(x2) - 1;
            if (l <= r) {
                tree.update(l, r, type === 0 ? 1 : -1);
            }
            i++;
        }

        prevY = cy;
    }

    // If exactly half at the very top (edge case, though unlikely)
    return prevY;
}
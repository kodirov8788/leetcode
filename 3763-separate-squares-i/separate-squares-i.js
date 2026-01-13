
function separateSquares(squares) {
    // Collect all unique y coordinates (bottom and top of each square)
    const events = [];
    
    for (const [x, y, len] of squares) {
        events.push({ y: y, type: 1, len });      // start (bottom)
        events.push({ y: y + len, type: -1, len }); // end (top)
    }
    
    // Sort by y-coordinate
    events.sort((a, b) => a.y - b.y || a.type - b.type);
    
    // Total area (counting overlaps multiple times)
    let totalArea = 0;
    for (const [, , len] of squares) {
        totalArea += len * len;
    }
    
    const target = totalArea / 2;
    
    // Binary search on y
    let left = 0;
    let right = 2e9 + 10; // safe upper bound
    
    // We need about 50 iterations for 1e-9 ~ 1e-10 precision
    for (let iter = 0; iter < 60; iter++) {
        const mid = (left + right) / 2;
        
        // Compute total area strictly below y = mid
        const areaBelow = computeAreaBelow(squares, mid);
        
        if (areaBelow < target) {
            left = mid;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Compute total area (with multiplicity) that is strictly below y = cut
 */
function computeAreaBelow(squares, cut) {
    let area = 0;
    
    for (const [x, y, len] of squares) {
        const bottom = y;
        const top = y + len;
        
        if (cut <= bottom) {
            // whole square is above → contribute 0
            continue;
        }
        if (cut >= top) {
            // whole square is below → contribute full area
            area += len * len;
            continue;
        }
        
        // partial overlap: cut is inside [bottom, top]
        const heightBelow = cut - bottom;
        area += len * heightBelow;
    }
    
    return area;
}

// ────────────────────────────────────────────────
//               Alternative: more precise version
// ────────────────────────────────────────────────

function separateSquaresPrecise(squares) {
    const ys = [];
    for (const [, y, l] of squares) {
        ys.push(y);
        ys.push(y + l);
    }
    ys.sort((a,b)=>a-b);
    
    let total = 0;
    for (const [, , l] of squares) total += l*l;
    const target = total / 2;
    
    let lo = -1, hi = 2e9 + 10;
    
    while (hi - lo > 1e-9) {
        const mid = (lo + hi) / 2;
        const below = computeAreaBelow(squares, mid);
        
        if (below <= target) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    
    return lo;
}


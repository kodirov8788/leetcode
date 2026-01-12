
function minTimeToVisitAllPoints(points) {
    let totalTime = 0;
    
    // Start from the first point, compare with next one
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        
        const dx = Math.abs(curr[0] - prev[0]);
        const dy = Math.abs(curr[1] - prev[1]);
        
        // The minimum time is the maximum of horizontal and vertical distance
        // because diagonal movement covers both directions at once
        totalTime += Math.max(dx, dy);
    }
    
    return totalTime;
}


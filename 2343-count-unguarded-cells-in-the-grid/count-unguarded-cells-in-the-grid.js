/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function(m, n, guards, walls) {
    // 1. Initialize the Grid and Constants
    // 0: Unguarded/Empty
    // 1: Wall
    // 2: Guard
    // 3: Guarded (will be marked during traversal)
    const grid = Array(m).fill(0).map(() => Array(n).fill(0));
    
    const WALL = 1;
    const GUARD = 2;
    const GUARDED = 3;

    // 2. Place Walls and Guards on the Grid
    for (const [r, c] of walls) {
        grid[r][c] = WALL;
    }
    for (const [r, c] of guards) {
        grid[r][c] = GUARD;
    }

    // Directions: [dr, dc] for North, East, South, West
    const directions = [
        [-1, 0], // North
        [0, 1],  // East
        [1, 0],  // South
        [0, -1]  // West
    ];

    // 3. Mark Guarded Cells
    for (const [rStart, cStart] of guards) {
        // For each guard, traverse in all four directions
        for (const [dr, dc] of directions) {
            let r = rStart + dr;
            let c = cStart + dc;

            // Continue traversing in the current direction until an obstruction or boundary is hit
            while (r >= 0 && r < m && c >= 0 && c < n) {
                const cell = grid[r][c];

                // Check for obstruction (Wall or another Guard)
                if (cell === WALL || cell === GUARD) {
                    break;
                }
                
                // Mark the cell as guarded, but only if it's currently empty (0)
                // We don't need to change it if it's already marked as GUARDED (3)
                if (cell === 0) {
                    grid[r][c] = GUARDED;
                }
                
                // Move to the next cell in the same direction
                r += dr;
                c += dc;
            }
        }
    }

    // 4. Count Unguarded Cells
    let unguardedCount = 0;
    
    // Iterate through the entire grid and count cells that are still 0 (Unguarded/Empty)
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 0) {
                unguardedCount++;
            }
        }
    }

    return unguardedCount;
};
/**
 * @param {string} directions
 * @return {number}
 */
var countCollisions = function(directions) {
    // Remove cars going left from the left and right from the right
    const active = directions.replace(/^L+/, '').replace(/R+$/, '');
    
    // Count every moving car in the active zone → each causes 1 collision
    return active.replace(/S/g, '').length;
};
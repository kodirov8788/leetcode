/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide(dividend, divisor) {
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  if (divisor === 0) throw new Error("Division by zero is not allowed");
  if (dividend === INT_MIN && divisor === -1) return INT_MAX; // overflow case

  // Determine sign of result
  const negative = (dividend > 0) ^ (divisor > 0); // XOR to check if only one is negative

  // Work with positive values
  let a = Math.abs(dividend);
  let b = Math.abs(divisor);
  let result = 0;

  while (a >= b) {
    let temp = b;
    let multiple = 1;
    // Keep doubling divisor until it's too big
    while ((temp << 1) <= a && (temp << 1) > 0) {
      temp <<= 1;
      multiple <<= 1;
    }
    a -= temp;
    result += multiple;
  }

  // Apply sign
  result = negative ? -result : result;

  // Clamp result
  if (result < INT_MIN) return INT_MIN;
  if (result > INT_MAX) return INT_MAX;
  return result;
}
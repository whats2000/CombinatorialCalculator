/**
 * Calculates factorial of n
 * @param n - The number to calculate factorial for
 * @returns n!
 */
export function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculates permutation P(n, r) = n!/(n-r)!
 * @param n - Total number of items
 * @param r - Number of items to arrange
 * @returns Number of permutations
 */
export function permutation(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  let result = 1;
  for (let i = n; i > n - r; i--) {
    result *= i;
  }
  return result;
}

/**
 * Calculates combination C(n, r) = n!/(r!(n-r)!)
 * @param n - Total number of items
 * @param r - Number of items to choose
 * @returns Number of combinations
 */
export function combination(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  if (r === 0 || r === n) return 1;
  r = Math.min(r, n - r); // Optimization
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return Math.round(result);
}

/**
 * Calculates nth Catalan number
 * Formula: C_n = C(2n, n) / (n + 1)
 * @param n - Index of Catalan number
 * @returns nth Catalan number
 */
export function catalan(n: number): number {
  if (n < 0) return 0;
  return combination(2 * n, n) / (n + 1);
}

/**
 * Calculates nth Triangular number
 * Formula: T_n = n(n+1)/2
 * @param n - Index of Triangular number
 * @returns nth Triangular number
 */
export function triangular(n: number): number {
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
}

/**
 * Calculates nth Harmonic number
 * Formula: H_n = 1 + 1/2 + 1/3 + ... + 1/n
 * @param n - Index of Harmonic number
 * @returns nth Harmonic number
 */
export function harmonic(n: number): number {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 1 / i;
  }
  return sum;
}

/**
 * Calculates nth Fibonacci number
 * @param n - Index of Fibonacci number
 * @returns nth Fibonacci number
 */
export function fibonacci(n: number): number {
  if (n < 0) return 0;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

/**
 * Calculates nth Lucas number
 * @param n - Index of Lucas number
 * @returns nth Lucas number
 */
export function lucas(n: number): number {
  if (n < 0) return 0;
  if (n === 0) return 2;
  if (n === 1) return 1;
  let a = 2, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

/**
 * Calculates Eulerian number A(m, k)
 * Formula: A(m, k) = (k+1)*A(m-1, k) + (m-k)*A(m-1, k-1)
 * @param m - First parameter
 * @param k - Second parameter
 * @returns Eulerian number A(m, k)
 */
export function eulerian(m: number, k: number): number {
  if (m < 0 || k < 0 || (m > 0 && k >= m)) return 0;
  if (m === 0) return 1;
  
  // Use dynamic programming
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(m).fill(0));
  dp[0][0] = 1;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 0; j < i; j++) {
      dp[i][j] = (j + 1) * (dp[i - 1][j] || 0) + (i - j) * (dp[i - 1][j - 1] || 0);
    }
  }
  
  return dp[m][k];
}

/**
 * Calculates Stirling number of the second kind S(m, n)
 * Formula: S(m, n) = n*S(m-1, n) + S(m-1, n-1)
 * @param m - Number of objects
 * @param n - Number of non-empty subsets
 * @returns Stirling number S(m, n)
 */
export function stirling2(m: number, n: number): number {
  if (n > m || m < 0 || n < 0) return 0;
  if (n === 0 && m === 0) return 1;
  if (n === 0 || m === 0) return 0;
  if (n === 1 || n === m) return 1;
  
  // Use dynamic programming
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  dp[0][0] = 1;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= Math.min(i, n); j++) {
      dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1];
    }
  }
  
  return dp[m][n];
}

/**
 * Calculates partition number p(m, n) - number of ways to partition m into at most n parts
 * @param m - Number to partition
 * @param n - Maximum number of parts
 * @returns Partition number
 */
export function partition(m: number, n: number): number {
  if (m < 0 || n < 0) return 0;
  if (m === 0) return 1;
  if (n === 0) return 0;
  
  // Use dynamic programming
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 1;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = dp[i][j - 1];
      if (i >= j) {
        dp[i][j] += dp[i - j][j];
      }
    }
  }
  
  return dp[m][n];
}

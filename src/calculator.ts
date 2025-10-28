import {
  permutation,
  combination,
  catalan,
  triangular,
  harmonic,
  fibonacci,
  lucas,
  eulerian,
  stirling2,
  partition,
  factorial
} from './calculations';

export interface CalculationResult {
  formula: string;
  result: string;
  orderRelevant: string;
  repetition: string;
  interpretation: string;
}

export interface DistributionResult {
  distinctObjects: string;
  distinctContainers: string;
  emptyContainers: string;
  formula: string;
  numberOfDistributions: string;
  interpretation: string;
}

/**
 * Calculates all basic combinatorial results
 * @param n - First parameter
 * @param r - Second parameter
 * @returns Array of calculation results
 */
export function calculateBasicCombinatorics(n: number, r: number): CalculationResult[] {
  const results: CalculationResult[] = [];

  // P(n, r)
  results.push({
    formula: `P(${n}, ${r})`,
    result: permutation(n, r).toLocaleString(),
    orderRelevant: 'Yes',
    repetition: 'No',
    interpretation: `Arrange ${r} items from ${n} distinct items where order matters`
  });

  // C(n, r)
  results.push({
    formula: `C(${n}, ${r})`,
    result: combination(n, r).toLocaleString(),
    orderRelevant: 'No',
    repetition: 'No',
    interpretation: `Choose ${r} items from ${n} distinct items where order doesn't matter`
  });

  // n^r
  const nPowerR = Math.pow(n, r);
  results.push({
    formula: `${n}^${r}`,
    result: nPowerR.toLocaleString(),
    orderRelevant: 'Yes',
    repetition: 'Yes',
    interpretation: `Arrange ${r} items from ${n} distinct items with replacement`
  });

  // C(r+n-1, r)
  results.push({
    formula: `C(${r + n - 1}, ${r})`,
    result: combination(r + n - 1, r).toLocaleString(),
    orderRelevant: 'No',
    repetition: 'Yes',
    interpretation: `Choose ${r} items from ${n} distinct items with replacement (multiset)`
  });

  return results;
}

/**
 * Generates number sequences
 * @param n - Number of terms to generate
 * @returns Object containing all sequences
 */
export function generateSequences(n: number) {
  const sequences = {
    catalan: [] as number[],
    triangular: [] as number[],
    harmonic: [] as number[],
    fibonacci: [] as number[],
    lucas: [] as number[]
  };

  for (let i = 0; i < n; i++) {
    sequences.catalan.push(catalan(i));
    sequences.triangular.push(triangular(i));
    sequences.harmonic.push(harmonic(i + 1));
    sequences.fibonacci.push(fibonacci(i));
    sequences.lucas.push(lucas(i));
  }

  return sequences;
}

/**
 * Calculates Eulerian numbers sequence
 * @param m - Parameter m
 * @param k - Specific k value (optional)
 * @returns Full sequence and specific value
 */
export function calculateEulerianNumbers(m: number, k: number) {
  const sequence: number[] = [];
  
  for (let i = 0; i < m; i++) {
    sequence.push(eulerian(m, i));
  }

  const specificValue = k >= 0 && k < m ? eulerian(m, k) : 0;

  return {
    sequence,
    specificValue
  };
}

/**
 * Calculates Stirling numbers of the second kind
 * @param m - Number of objects
 * @param n - Maximum number of subsets
 * @returns Sequence of Stirling numbers
 */
export function calculateStirlingNumbers(m: number, n: number): number[] {
  const sequence: number[] = [];
  
  for (let i = 1; i <= n; i++) {
    sequence.push(stirling2(m, i));
  }

  return sequence;
}

/**
 * Calculates all distribution types
 * @param m - Number of objects
 * @param n - Number of containers
 * @returns Array of distribution results
 */
export function calculateDistributions(m: number, n: number): DistributionResult[] {
  const results: DistributionResult[] = [];

  // 1. D-obj, D-con, Yes-empty: n^m
  const dist1 = Math.pow(n, m);
  results.push({
    distinctObjects: 'Yes',
    distinctContainers: 'Yes',
    emptyContainers: 'Allowed',
    formula: `$n^m$`,
    numberOfDistributions: dist1.toLocaleString(),
    interpretation: `Distribute ${m} distinct objects into ${n} distinct containers (some may be empty)`
  });

  // 2. D-obj, D-con, No-empty: n! * S(m, n)
  const dist2 = factorial(n) * stirling2(m, n);
  results.push({
    distinctObjects: 'Yes',
    distinctContainers: 'Yes',
    emptyContainers: 'Not Allowed',
    formula: `$n! \\cdot S(m, n)$`,
    numberOfDistributions: dist2.toLocaleString(),
    interpretation: `Distribute ${m} distinct objects into ${n} distinct containers (none empty)`
  });

  // 3. D-obj, I-con, Yes-empty: Sum of S(m, i) for i=0 to n
  let dist3 = 0;
  for (let i = 0; i <= Math.min(m, n); i++) {
    dist3 += stirling2(m, i);
  }
  results.push({
    distinctObjects: 'Yes',
    distinctContainers: 'No',
    emptyContainers: 'Allowed',
    formula: `$\\sum_{i=0}^{n} S(m, i)$`,
    numberOfDistributions: dist3.toLocaleString(),
    interpretation: `Distribute ${m} distinct objects into at most ${n} indistinct containers`
  });

  // 4. D-obj, I-con, No-empty: S(m, n)
  const dist4 = stirling2(m, n);
  results.push({
    distinctObjects: 'Yes',
    distinctContainers: 'No',
    emptyContainers: 'Not Allowed',
    formula: `$S(m, n)$`,
    numberOfDistributions: dist4.toLocaleString(),
    interpretation: `Distribute ${m} distinct objects into exactly ${n} indistinct containers (none empty)`
  });

  // 5. I-obj, D-con, Yes-empty: C(m+n-1, m)
  const dist5 = combination(m + n - 1, m);
  results.push({
    distinctObjects: 'No',
    distinctContainers: 'Yes',
    emptyContainers: 'Allowed',
    formula: `$C(m+n-1, m)$`,
    numberOfDistributions: dist5.toLocaleString(),
    interpretation: `Distribute ${m} identical objects into ${n} distinct containers (some may be empty)`
  });

  // 6. I-obj, D-con, No-empty: C(m-1, n-1)
  const dist6 = combination(m - 1, n - 1);
  results.push({
    distinctObjects: 'No',
    distinctContainers: 'Yes',
    emptyContainers: 'Not Allowed',
    formula: `$C(m-1, n-1)$`,
    numberOfDistributions: dist6.toLocaleString(),
    interpretation: `Distribute ${m} identical objects into ${n} distinct containers (none empty)`
  });

  // 7. I-obj, I-con, Yes-empty: Sum of p(m, i) for i=0 to n
  let dist7 = 0;
  for (let i = 0; i <= n; i++) {
    dist7 += partition(m, i);
  }
  results.push({
    distinctObjects: 'No',
    distinctContainers: 'No',
    emptyContainers: 'Allowed',
    formula: `$\\sum_{i=0}^{n} p(m, i)$`,
    numberOfDistributions: dist7.toLocaleString(),
    interpretation: `Partition ${m} identical objects into at most ${n} indistinct groups`
  });

  // 8. I-obj, I-con, No-empty: p(m, n)
  const dist8 = partition(m, n);
  results.push({
    distinctObjects: 'No',
    distinctContainers: 'No',
    emptyContainers: 'Not Allowed',
    formula: `$p(m, n)$`,
    numberOfDistributions: dist8.toLocaleString(),
    interpretation: `Partition ${m} identical objects into exactly ${n} indistinct groups (none empty)`
  });

  return results;
}

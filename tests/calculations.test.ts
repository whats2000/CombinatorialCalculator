import {
  factorial,
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
} from '../src/calculations.js';

/* ---------- helpers ---------- */

const factorialTable: number[] = [
  1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880,
  3628800, 39916800, 479001600,
]; // 0..12 (safe integers)

const catalanFirst10 = [1,1,2,5,14,42,132,429,1430,4862];
const fibFirst12     = [0,1,1,2,3,5,8,13,21,34,55,89];
const lucasFirst12   = [2,1,3,4,7,11,18,29,47,76,123,199];

// Eulerian rows A(n,k), k=0..n-1 (n >= 1). Also include n=0 special case.
const eulerianRows: Record<number, number[]> = {
  0: [1],              // A(0,0) = 1
  1: [1],              // [1]
  2: [1,1],            // [1,1]
  3: [1,4,1],          // [1,4,1]
  4: [1,11,11,1],      // [1,11,11,1]
  5: [1,26,66,26,1],   // [1,26,66,26,1]
};

// Stirling S(n,k) small triangle (n up to 6)
const stirlingRows: Record<number, number[]> = {
  0: [1],
  1: [0,1],
  2: [0,1,1],
  3: [0,1,3,1],
  4: [0,1,7,6,1],
  5: [0,1,15,25,10,1],
  6: [0,1,31,90,65,15,1],
};

// Bell numbers B_n for n=0..6
const bell = [1,1,2,5,15,52,203];

/* ---------- factorial ---------- */

describe('factorial (wide & identities)', () => {
  test('table 0..12 exact', () => {
    for (let n = 0; n < factorialTable.length; n++) {
      expect(factorial(n)).toBe(factorialTable[n]);
    }
  });

  it.each([0,1,2,3,4,5,6,7,8,9,10,11,12])('n! >= (n-1)! for n=%i', (n) => {
    if (n === 0) return;
    expect(factorial(n)).toBeGreaterThanOrEqual(factorial(n - 1));
  });

  it.each([0,1,2,3,4,5])('P(n,n) === n! for n=%i', (n) => {
    expect(permutation(n, n)).toBe(factorial(n));
  });

  test('returns 0 for negative n', () => {
    expect(factorial(-1)).toBe(0);
  });
});

/* ---------- permutation ---------- */

describe('permutation (coverage & links)', () => {
  it.each([
    [5,3,60],[5,0,1],[5,5,120],[1,1,1],[10,1,10],[10,2,90]
  ])('P(%i,%i) expected=%i', (n,r,ans) => {
    expect(permutation(n,r)).toBe(ans);
  });

  test('P(n,1) = n for n up to 20', () => {
    for (let n = 0; n <= 20; n++) {
      expect(permutation(n, 1)).toBe(n);
    }
  });

  test('P(n,r) = C(n,r) * r! within safe region', () => {
    for (let n = 0; n <= 12; n++) {
      for (let r = 0; r <= n; r++) {
        const lhs = permutation(n, r);
        const rhs = combination(n, r) * factorial(r);
        expect(lhs).toBe(rhs);
      }
    }
  });

  test('invalid inputs -> 0', () => {
    expect(permutation(3,5)).toBe(0);
    expect(permutation(-1,2)).toBe(0);
    expect(permutation(5,-1)).toBe(0);
  });
});

/* ---------- combination ---------- */

describe('combination (identities & bounds)', () => {
  it.each([
    [5,3,10],[5,0,1],[5,5,1],[10,4,210],[10,1,10],[10,2,45]
  ])('C(%i,%i) expected=%i', (n,r,ans) => {
    expect(combination(n,r)).toBe(ans);
  });

  test('symmetry: C(n,r) = C(n,n-r)', () => {
    for (let n = 0; n <= 30; n++) {
      for (let r = 0; r <= n; r++) {
        expect(combination(n,r)).toBe(combination(n, n - r));
      }
    }
  });

  test('Pascal identity: C(n,r) = C(n-1,r) + C(n-1,r-1)', () => {
    for (let n = 2; n <= 25; n++) {
      for (let r = 1; r < n; r++) {
        expect(combination(n,r))
          .toBe(combination(n-1,r) + combination(n-1,r-1));
      }
    }
  });

  it.each([0,1,2,3,4,5,10,15])('sum_r C(n,r) = 2^n for n=%i', (n) => {
    let sum = 0;
    for (let r = 0; r <= n; r++) sum += combination(n,r);
    expect(sum).toBe(2 ** n);
  });

  test('invalid inputs -> 0', () => {
    expect(combination(3,5)).toBe(0);
    expect(combination(-1,2)).toBe(0);
    expect(combination(5,-1)).toBe(0);
  });
});

/* ---------- catalan ---------- */

describe('catalan (sequence & recurrence)', () => {
  test('first 10 values', () => {
    for (let n = 0; n < catalanFirst10.length; n++) {
      expect(catalan(n)).toBe(catalanFirst10[n]);
    }
  });

  test('recurrence: C_{n+1} = 2(2n+1)/(n+2) * C_n', () => {
    for (let n = 0; n < 9; n++) {
      const lhs = catalan(n + 1);
      const rhs = (2 * (2 * n + 1) / (n + 2)) * catalan(n);
      expect(lhs).toBe(rhs);
    }
  });

  test('negative -> 0', () => {
    expect(catalan(-1)).toBe(0);
  });
});

/* ---------- triangular ---------- */

describe('triangular (properties)', () => {
  it.each([
    [0,0],[1,1],[5,15],[10,55],[100,5050],
  ])('T_%i expected=%i', (n,ans) => {
    expect(triangular(n)).toBe(ans);
  });

  test('difference: T_n - T_{n-1} = n', () => {
    for (let n = 1; n <= 200; n++) {
      expect(triangular(n) - triangular(n-1)).toBe(n);
    }
  });

  test('negative -> 0', () => {
    expect(triangular(-1)).toBe(0);
  });
});

/* ---------- harmonic ---------- */

describe('harmonic (bounds & increments)', () => {
  it.each([1,2,3,4,5,10,20])('H_%i - H_{n-1} ≈ 1/n', (n) => {
    const prev = n > 1 ? harmonic(n-1) : 0;
    const diff = harmonic(n) - prev;
    expect(diff).toBeCloseTo(1 / n, 10);
  });

  it.each([2,10,100,500])('ln(n) < H_n < ln(n)+1 for n=%i', (n) => {
    const h = harmonic(n);
    const ln = Math.log(n);
    expect(h).toBeGreaterThan(ln);
    expect(h).toBeLessThan(ln + 1);
  });

  test('non-positive -> 0', () => {
    expect(harmonic(0)).toBe(0);
    expect(harmonic(-1)).toBe(0);
  });
});

/* ---------- fibonacci & lucas ---------- */

describe('fibonacci / lucas (sequences & identities)', () => {
  test('F_0..11', () => {
    for (let i = 0; i < fibFirst12.length; i++) {
      expect(fibonacci(i)).toBe(fibFirst12[i]);
    }
  });

  test('L_0..11', () => {
    for (let i = 0; i < lucasFirst12.length; i++) {
      expect(lucas(i)).toBe(lucasFirst12[i]);
    }
  });

  test('Lucas identity: L_n = F_{n-1} + F_{n+1}', () => {
    for (let n = 1; n <= 25; n++) {
      expect(lucas(n)).toBe(fibonacci(n - 1) + fibonacci(n + 1));
    }
  });

  test("Cassini: F_{n+1}F_{n-1} - F_n^2 = (-1)^n (small n)", () => {
    for (let n = 2; n <= 20; n++) {
      const lhs = fibonacci(n + 1) * fibonacci(n - 1) - fibonacci(n) ** 2;
      const rhs = (n % 2 === 0) ? 1 : -1;
      expect(lhs).toBe(rhs);
    }
  });

  test('negative -> 0', () => {
    expect(fibonacci(-1)).toBe(0);
    expect(lucas(-1)).toBe(0);
  });
});

/* ---------- eulerian ---------- */

describe('eulerian (triangle & bases)', () => {
  test('A(0,0) = 1 (base case)', () => {
    // NOTE: This test will FAIL with the current implementation due to guard order.
    // See quick fix note below.
    expect(eulerian(0, 0)).toBe(1);
  });

  test('rows n=1..5', () => {
    for (const n of [1,2,3,4,5]) {
      const row = [];
      for (let k = 0; k < n; k++) row.push(eulerian(n, k));
      expect(row).toEqual(eulerianRows[n]);
    }
  });

  it.each([
    [3,1,4],[4,2,11],[5,2,66]
  ])('A(%i,%i)=%i spot checks', (m,k,ans) => {
    expect(eulerian(m,k)).toBe(ans);
  });

  test('invalid inputs -> 0', () => {
    expect(eulerian(3,3)).toBe(0);
    expect(eulerian(3,4)).toBe(0);
    expect(eulerian(-1,2)).toBe(0);
    expect(eulerian(3,-1)).toBe(0);
  });
});

/* ---------- stirling2 ---------- */

describe('stirling2 (triangle, edges, Bell numbers)', () => {
  test('triangle rows up to n=6', () => {
    for (const n of Object.keys(stirlingRows).map(Number)) {
      const row: number[] = [];
      for (let k = 0; k <= n; k++) row.push(stirling2(n, k));
      expect(row).toEqual(stirlingRows[n]);
    }
  });

  test('edges: S(n,1)=1, S(n,n)=1 (n>=1)', () => {
    for (let n = 1; n <= 12; n++) {
      expect(stirling2(n,1)).toBe(1);
      expect(stirling2(n,n)).toBe(1);
    }
  });

  test('Bell numbers via sum_k S(n,k)', () => {
    for (let n = 0; n <= 6; n++) {
      let sum = 0;
      for (let k = 0; k <= n; k++) sum += stirling2(n,k);
      expect(sum).toBe(bell[n]);
    }
  });

  test('invalid inputs -> 0', () => {
    expect(stirling2(2,3)).toBe(0);
    expect(stirling2(-1,2)).toBe(0);
    expect(stirling2(3,-1)).toBe(0);
  });

  it.each([[0,0,1],[1,1,1]])('base S(%i,%i)=%i', (m,n,ans) => {
    expect(stirling2(m,n)).toBe(ans);
  });
});

/* ---------- partition ---------- */

describe('partition p(m,n) (properties & values)', () => {
  it.each([
    [4,2,3],[5,3,5],[0,5,1],[6,2,4],[6,3,7],
  ])('p(%i,%i)=%i small checks', (m,n,ans) => {
    expect(partition(m,n)).toBe(ans);
  });

  test('p(m,1) = 1 for m >= 0', () => {
    for (let m = 0; m <= 25; m++) {
      expect(partition(m,1)).toBe(1);
    }
  });

  test('non-decreasing in n and saturates at n>=m', () => {
    for (let m = 1; m <= 20; m++) {
      let prev = 0;
      for (let n = 1; n <= m; n++) {
        const val = partition(m,n);
        expect(val).toBeGreaterThanOrEqual(prev);
        prev = val;
      }
      const saturated = partition(m, m);
      expect(partition(m, m+1)).toBe(saturated);
      expect(partition(m, 100)).toBe(saturated);
    }
  });

  test('recurrence: p(m,n) = p(m,n-1) + p(m-n,n) when m>=n>0', () => {
    for (let m = 1; m <= 20; m++) {
      for (let n = 1; n <= m; n++) {
        const lhs = partition(m,n);
        const rhs = partition(m, n-1) + (m - n >= 0 ? partition(m - n, n) : 0);
        expect(lhs).toBe(rhs);
      }
    }
  });

  test('p(10,10) = 42 (all partitions of 10)', () => {
    expect(partition(10,10)).toBe(42);
  });

  test('invalid inputs -> 0', () => {
    expect(partition(-1,2)).toBe(0);
    expect(partition(3,-1)).toBe(0);
    expect(partition(3,0)).toBe(0);
  });
});

/* ---------- cross-function consistency ---------- */

describe('cross-function consistency (sanity)', () => {
  test('Catalan via binomial: Cat(n) = C(2n,n)/(n+1)', () => {
    for (let n = 0; n <= 10; n++) {
      const viaBinom = combination(2*n, n) / (n + 1);
      expect(catalan(n)).toBe(viaBinom);
    }
  });

  test('binomial column sum equals 2^n (reuse comb)', () => {
    for (let n = 0; n <= 15; n++) {
      let s = 0;
      for (let r = 0; r <= n; r++) s += combination(n,r);
      expect(s).toBe(2 ** n);
    }
  });
});

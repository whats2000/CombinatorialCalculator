import './style.css';
import {
  calculateBasicCombinatorics,
  generateSequences,
  calculateEulerianNumbers,
  calculateStirlingNumbers,
  calculateDistributions
} from './calculator';

// Render math with KaTeX
function renderMath() {
  const renderMathInElement = (window as any).renderMathInElement;
  if (renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }
}

// Format number with commas
function formatNumber(num: number): string {
  return num.toLocaleString('en-US', {maximumFractionDigits: 6});
}

// Format sequence with highlighting for specific index
function formatSequence(values: number[], highlightIndex?: number): string {
  return values.map((val, idx) => {
    const formatted = formatNumber(val);
    if (highlightIndex !== undefined && idx === highlightIndex) {
      return `<span class="result-cell">${formatted}</span>`;
    }
    return formatted;
  }).join(', ');
}

// Create results HTML
function createResultsHTML(n: number, r: number, m: number, k: number): string {
  const basicResults = calculateBasicCombinatorics(n, r);
  const sequences = generateSequences(n);
  const eulerianResults = calculateEulerianNumbers(m, k);
  const stirlingResults = calculateStirlingNumbers(m, n);
  const distributions = calculateDistributions(m, n);

  return `
    <div class="results-container">
      <section class="result-section">
        <h2>Part 1: Basic Combinatorics ($n=${n}$, $r=${r}$)</h2>
        <div class="table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Formula</th>
                <th>Result</th>
                <th>Order Relevant</th>
                <th>Repetition</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              ${basicResults.map(result => `
                <tr>
                  <td class="formula-cell">$${result.formula}$</td>
                  <td class="result-cell">${result.result}</td>
                  <td>${result.orderRelevant}</td>
                  <td>${result.repetition}</td>
                  <td class="interpretation-cell">${result.interpretation}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section class="result-section">
        <h2>Part 2: Number Sequences (First $${n}$ terms)</h2>
        <div class="table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Sequence</th>
                <th>Formula</th>
                <th>Values (First ${n} terms)</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="formula-cell">Catalan</td>
                <td>$C_n = \\frac{1}{n+1}\\binom{2n}{n}$</td>
                <td class="sequence-values">${formatSequence(sequences.catalan, n - 1)}</td>
                <td class="interpretation-cell">Number of valid parentheses expressions, binary trees, and many other combinatorial structures</td>
              </tr>
              <tr>
                <td class="formula-cell">Triangular</td>
                <td>$T_n = \\frac{n(n+1)}{2}$</td>
                <td class="sequence-values">${formatSequence(sequences.triangular, n - 1)}</td>
                <td class="interpretation-cell">Sum of first n natural numbers; number of dots in a triangular arrangement</td>
              </tr>
              <tr>
                <td class="formula-cell">Harmonic</td>
                <td>$H_n = \\sum_{i=1}^{n} \\frac{1}{i}$</td>
                <td class="sequence-values">${formatSequence(sequences.harmonic, n - 1)}</td>
                <td class="interpretation-cell">Sum of reciprocals; appears in analysis of algorithms and probability theory</td>
              </tr>
              <tr>
                <td class="formula-cell">Fibonacci</td>
                <td>$F_n = F_{n-1} + F_{n-2}$</td>
                <td class="sequence-values">${formatSequence(sequences.fibonacci, n - 1)}</td>
                <td class="interpretation-cell">Number of ways to climb n stairs taking 1 or 2 steps at a time; appears in nature and mathematics</td>
              </tr>
              <tr>
                <td class="formula-cell">Lucas</td>
                <td>$L_n = L_{n-1} + L_{n-2}$</td>
                <td class="sequence-values">${formatSequence(sequences.lucas, n - 1)}</td>
                <td class="interpretation-cell">Related to Fibonacci numbers; used in primality testing and Fibonacci identities</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="result-section">
        <h2>Part 3: Eulerian Numbers ($m=${m}$)</h2>
        <div class="table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Range</th>
                <th>Values</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="formula-cell">Full Sequence</td>
                <td>$A(${m}, 0)$ to $A(${m}, ${m - 1})$</td>
                <td class="sequence-values">${eulerianResults.sequence.map(formatNumber).join(', ')}</td>
                <td class="interpretation-cell">Number of permutations of ${m} elements with exactly k descents (k from 0 to ${m - 1})</td>
              </tr>
              <tr>
                <td class="formula-cell">Value at $k=${k}$</td>
                <td>$A(${m}, ${k})$</td>
                <td class="highlight-value-inline">${formatNumber(eulerianResults.specificValue)}</td>
                <td class="interpretation-cell">Number of permutations of ${m} elements with exactly ${k} descents</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="result-section">
        <h2>Part 4: Stirling Numbers (2nd Kind, $m=${m}$, $n=${n}$)</h2>
        <p class="section-description">$S(m,n) = n \\cdot S(m-1,n) + S(m-1,n-1)$</p>
        <div class="table-responsive">
          <table class="results-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Range</th>
                <th>Values</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="formula-cell">Sequence</td>
                <td>$S(${m}, 1)$ to $S(${m}, ${n})$</td>
                <td class="sequence-values">${stirlingResults.map(formatNumber).join(', ')}</td>
                <td class="interpretation-cell">Number of ways to partition ${m} distinct objects into k non-empty indistinguishable subsets (k from 1 to ${n})</td>
              </tr>
              <tr>
                <td class="formula-cell">Value at $n=${n}$</td>
                <td>$S(${m}, ${n})$</td>
                <td class="highlight-value-inline">${formatNumber(stirlingResults[n - 1] || 0)}</td>
                <td class="interpretation-cell">Number of ways to partition ${m} distinct objects into exactly ${n} non-empty indistinguishable subsets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="result-section bonus-section">
        <h2>Bonus: Distribution Computations ($m=${m}$, $n=${n}$)</h2>
        <p class="section-description">Ways to distribute objects into containers based on different constraints</p>
        <div class="table-responsive">
          <table class="results-table distribution-table">
            <thead>
              <tr>
                <th>Distinct Objects (m)</th>
                <th>Distinct Containers (n)</th>
                <th>Empty Containers</th>
                <th>Formula</th>
                <th>Number of Distributions</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              ${distributions.map(dist => `
                <tr>
                  <td>${dist.distinctObjects}</td>
                  <td>${dist.distinctContainers}</td>
                  <td>${dist.emptyContainers}</td>
                  <td class="formula-cell">${dist.formula}</td>
                  <td class="result-cell">${dist.numberOfDistributions}</td>
                  <td class="interpretation-cell">${dist.interpretation}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

// Handle form submission
function handleCalculate() {
  const nInput = document.getElementById('input-n') as HTMLInputElement;
  const rInput = document.getElementById('input-r') as HTMLInputElement;
  const mInput = document.getElementById('input-m') as HTMLInputElement;
  const kInput = document.getElementById('input-k') as HTMLInputElement;

  const n = parseInt(nInput.value);
  const r = parseInt(rInput.value);
  const m = parseInt(mInput.value);
  const k = parseInt(kInput.value);

  // Validate inputs
  if (isNaN(n) || isNaN(r) || isNaN(m) || isNaN(k)) {
    alert('Please enter valid numbers for all inputs');
    return;
  }

  if (n < 0 || r < 0 || m < 0 || k < 0) {
    alert('Please enter non-negative numbers');
    return;
  }

  if (n > 100 || r > 100 || m > 100 || k > 100) {
    alert('Please enter numbers less than or equal to 100 to avoid computation issues');
    return;
  }

  // Generate and display results
  const resultsContainer = document.getElementById('results');
  if (resultsContainer) {
    resultsContainer.innerHTML = createResultsHTML(n, r, m, k);
    resultsContainer.style.display = 'block';

    // Render math after a short delay to ensure DOM is updated
    setTimeout(renderMath, 100);
  }
}

// Initialize app
function initApp() {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  app.innerHTML = `
    <div class="calculator-container">
      <header class="app-header">
        <h1>Combinatorial Calculator</h1>
        <p class="subtitle">Comprehensive tool for combinatorial mathematics</p>
      </header>

      <div class="content-wrapper">
        <div id="results" class="results" style="display: none;"></div>
      </div>

      <div class="floating-input-container">
        <div class="input-container">
          <h2>Parameters</h2>
          <form id="calculator-form" class="input-form">
            <div class="input-grid">
              <div class="input-group">
                <label for="input-n">$n$ (items/terms)</label>
                <input type="number" id="input-n" min="0" max="100" value="5" required>
              </div>
              <div class="input-group">
                <label for="input-r">$r$ (selection)</label>
                <input type="number" id="input-r" min="0" max="100" value="3" required>
              </div>
              <div class="input-group">
                <label for="input-m">$m$ (objects)</label>
                <input type="number" id="input-m" min="0" max="100" value="5" required>
              </div>
              <div class="input-group">
                <label for="input-k">$k$ (index)</label>
                <input type="number" id="input-k" min="0" max="100" value="2" required>
              </div>
            </div>
            <button type="submit" class="calculate-btn">Calculate</button>
          </form>
        </div>
      </div>

      <footer class="app-footer">
        <p>Built with TypeScript & KaTeX • Responsive Design for PC & Mobile</p>
      </footer>
    </div>
  `;

  // Render initial math in labels
  setTimeout(renderMath, 100);

  // Add event listener
  const form = document.getElementById('calculator-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleCalculate();
    });
  }

  // Auto-calculate on input change
  const inputs = ['input-n', 'input-r', 'input-m', 'input-k'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        const resultsContainer = document.getElementById('results');
        if (resultsContainer && resultsContainer.style.display === 'block') {
          handleCalculate();
        }
      });
    }
  });
}

// Wait for KaTeX to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


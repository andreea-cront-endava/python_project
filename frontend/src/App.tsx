import { useState, useEffect } from 'react';
import { MathForm } from './components/MathForm';
import type { PowerRequest, FibRequest, FactRequest } from './types';
import './index.css';

function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("apiKey") || "";
  });

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  const [resetCounter, setResetCounter] = useState(0);
  const handleRestart = () => setResetCounter(prev => prev + 1);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>
        Math Service
      </h1>
      <button
        onClick={handleRestart}
        style={{
          display: 'block',
          margin: '0 auto 30px', 
          padding: '8px 16px',
          fontSize: 16,
          cursor: 'pointer'
        }}
      >
        Restart Forms
      </button>
      <div className="container">
        <label>API Key:</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
        />
      </div>

      <div style={{ marginBottom: 30, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Power Calculation</h2>
        <MathForm<PowerRequest>
          key={`power-${resetCounter}`}
          endpoint="pow"
          apiKey={apiKey}
          renderInputs={(data, onChange, onRawChange, rawValues) => (
            <>
              <div>
                <label>Base:</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={rawValues.base || ''}
                  onChange={e => onRawChange('base', e.target.value)}
                  onPaste={e => e.preventDefault()}
                  placeholder="Enter base number"
                  style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
                <small style={{ color: '#666' }}>Any real number (e.g., 5, -3, 0.5, -12.34)</small>
              </div>

              <div>
                <label>Exponent:</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={rawValues.exponent || ''}
                  onChange={e => onRawChange('exponent', e.target.value)}
                  onPaste={e => e.preventDefault()}
                  placeholder="Enter exponent"
                  style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
                <small style={{ color: '#666' }}>
                  {(data.base || 0) < 0 
                    ? 'Must be an integer when base is negative'
                    : 'Any real number (e.g., 2, -1, 0.5, -3.14)'}
                </small>
              </div>
            </>
          )}
        />
      </div>

      <div style={{ marginBottom: 30, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Fibonacci Calculation</h2>
        <MathForm<FibRequest>
          key={`fib-${resetCounter}`}
          endpoint="fibonacci"
          apiKey={apiKey}
          renderInputs={(data, onChange, onRawChange, rawValues) => (
            <>
              <div>
                <label>n (Fibonacci index):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rawValues.n || ''}
                  onChange={e => onRawChange('n', e.target.value)}
                  onPaste={e => e.preventDefault()}
                  onKeyPress={e => {
                    // Only allow digits for Fibonacci (non-negative integers only)
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter n (≥ 0, integer)"
                  style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
              </div>
            </>
          )}
        />
      </div>

      {/* Factorial Form */}
      <div style={{ marginBottom: 30, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Factorial Calculation</h2>
        <MathForm<FactRequest>
          key={`fact-${resetCounter}`}
          endpoint="factorial"
          apiKey={apiKey}
          renderInputs={(data, onChange, onRawChange, rawValues) => (
            <>
              <div>
                <label>n (Factorial):</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rawValues.n || ''}
                  onChange={e => onRawChange('n', e.target.value)}
                  onPaste={e => e.preventDefault()}
                  onKeyPress={e => {
                    // Only allow digits for Factorial (non-negative integers only)
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter n (≥ 0, integer)"
                  style={{ width: '100%', padding: 8, marginBottom: 10 }}
                />
              </div>
            </>
          )}
        />
      </div>
      <div style={{ marginTop: 30, padding: 15, background: '#f5f5f5', borderRadius: 8 }}>
        <h3>Validation Rules:</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Power calculation accepts any real numbers (decimals allowed)</li>
          <li>When base is negative, exponent must be an integer</li>
          <li>Fibonacci and Factorial only accept non-negative integers</li>
          <li>No leading zeros allowed (e.g., "01.5" is invalid)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
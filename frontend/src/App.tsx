//Aplicatia principala pentru functiile matematice
// Aceasta pagina contine formularul pentru cele 3 functii matematice: putere, fibonacci si factorial
// Utilizatorul trebuie sa fie autentificat si sa aiba cheia API introdusa pentru a accesa aceste functii
import { useState, useEffect } from 'react';
import { MathForm } from './components/MathForm';
import { useNavigate } from 'react-router-dom';
import type { PowerRequest, FibRequest, FactRequest } from './types';
import './index.css';

function App() {
  const navigate = useNavigate();
  const [apiKey] = useState(() => localStorage.getItem("apiKey") || "");
  const [resetCounter, setResetCounter] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRestart = () => setResetCounter(prev => prev + 1);

  useEffect(() => {
    const isAllowed = localStorage.getItem("accessGranted") === "true";
    const key = localStorage.getItem("apiKey");
    if (!isAllowed || !key) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{
      maxWidth: 700,
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
      }}>
        <h1 style={{ margin: 0, fontSize: 28, color: '#935555ff' }}> Math Service</h1>
        <button onClick={handleLogout} style={{
          backgroundColor: '#935555ff',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 6,
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>

      {/* Navigation link */}
      <div style={{ marginBottom: 30 }}>
        <a href="/my-loggs" style={{
          color: '#935555ff',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          - View My Loggs
        </a>
      </div>

      {/* Restart Forms */}
      <button
        onClick={handleRestart}
        style={{
          display: 'block',
          margin: '0 auto 30px',
          padding: '10px 20px',
          fontSize: 16,
          backgroundColor: '#935555ff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        Restart Forms
      </button>

      {/* Power */}
      <Section title="Power Calculation">
        <MathForm<PowerRequest>
          key={`power-${resetCounter}`}
          endpoint="pow"
          apiKey={apiKey}
          renderInputs={(data, _, onRawChange, rawValues) => (
            <>
              <LabeledInput
                label="Base"
                value={rawValues.base || ''}
                onChange={val => onRawChange('base', val)}
                placeholder="Enter base number"
                help="Any real number (e.g., 5, -3, 0.5)"
              />
              <LabeledInput
                label="Exponent"
                value={rawValues.exponent || ''}
                onChange={val => onRawChange('exponent', val)}
                placeholder="Enter exponent"
                help={
                  (data.base || 0) < 0
                    ? 'Must be an integer when base is negative'
                    : 'Any real number'
                }
              />
            </>
          )}
        />
      </Section>

      {/* Fibonacci */}
      <Section title="Fibonacci Calculation">
        <MathForm<FibRequest>
          key={`fib-${resetCounter}`}
          endpoint="fibonacci"
          apiKey={apiKey}
          renderInputs={(_, __, onRawChange, rawValues) => (
            <LabeledInput
              label="n (Fibonacci index)"
              value={rawValues.n || ''}
              onChange={val => onRawChange('n', val)}
              placeholder="Enter n (≥ 0, integer)"
              numericOnly
            />
          )}
        />
      </Section>

      {/* Factorial */}
      <Section title="Factorial Calculation">
        <MathForm<FactRequest>
          key={`fact-${resetCounter}`}
          endpoint="factorial"
          apiKey={apiKey}
          renderInputs={(_, __, onRawChange, rawValues) => (
            <LabeledInput
              label="n (Factorial)"
              value={rawValues.n || ''}
              onChange={val => onRawChange('n', val)}
              placeholder="Enter n (≥ 0, integer)"
              numericOnly
            />
          )}
        />
      </Section>

      {/* Validation Info */}
      <div style={{
        marginTop: 40,
        padding: 20,
        background: '#f9f9f9',
        borderRadius: 10,
        border: '1px solid #eee'
      }}>
        <h3 style={{ marginBottom: 10 }}>Validation Rules:</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#555' }}>
          <li>Power calculation accepts any real numbers (decimals allowed)</li>
          <li>When base is negative, exponent must be an integer</li>
          <li>Fibonacci and Factorial only accept non-negative integers</li>
          <li>No leading zeros allowed (e.g., "01.5" is invalid)</li>
        </ul>
      </div>
    </div>
  );
}

// Reusable Card Section
function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{
      marginBottom: 30,
      padding: 20,
      border: '1px solid #ddd',
      borderRadius: 10,
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ marginBottom: 15 }}>{title}</h2>
      {children}
    </div>
  );
}

// Reusable input field
function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  help,
  numericOnly = false
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  help?: string;
  numericOnly?: boolean;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', marginBottom: 6 }}>{label}:</label>
      <input
        type="text"
        inputMode={numericOnly ? "numeric" : "decimal"}
        value={value}
        onChange={e => onChange(e.target.value)}
        onPaste={e => e.preventDefault()}
        onKeyPress={e => {
          if (numericOnly && !/^\d$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: 10,
          border: '1px solid #ccc',
          borderRadius: 6
        }}
      />
      {help && <small style={{ color: '#777' }}>{help}</small>}
    </div>
  );
}

export default App;

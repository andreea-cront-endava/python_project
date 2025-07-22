import { MathForm } from './components/MathForm';
import type { PowerRequest, FibRequest, FactRequest } from './types';
import './index.css';

function App() {
  return (
    <div>
      <h1 className="container">Math Service</h1>

      <MathForm<PowerRequest>
        endpoint="pow"
        initialData={{ base: 2, exponent: 3 }}
        renderInputs={(data, onChange) => (
          <>
            <label>Base:</label>
            <input type="number" value={data.base}
                   onChange={e => onChange('base', +e.target.value)} />
            <label>Exponent:</label>
            <input type="number" value={data.exponent}
                   onChange={e => onChange('exponent', +e.target.value)} />
          </>
        )}
      />

      <MathForm<FibRequest>
        endpoint="fibonacci"
        initialData={{ n: 5 }}
        renderInputs={(data, onChange) => (
          <>
            <label>n (Fibonacci):</label>
            <input type="number" value={data.n}
                   onChange={e => onChange('n', +e.target.value)} />
          </>
        )}
      />

      <MathForm<FactRequest>
        endpoint="factorial"
        initialData={{ n: 5 }}
        renderInputs={(data, onChange) => (
          <>
            <label>n (Factorial):</label>
            <input type="number" value={data.n}
                   onChange={e => onChange('n', +e.target.value)} />
          </>
        )}
      />
    </div>
  );
}

export default App;

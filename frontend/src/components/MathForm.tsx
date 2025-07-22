import React, { useState } from 'react';
import type { JSX } from 'react';
import type { FormEvent } from 'react';

interface MathFormProps<I> {
  endpoint: string;
  initialData: I;
  renderInputs: (data: I, onChange: (k: keyof I, v: number) => void) => JSX.Element;
}

export function MathForm<I extends object>({
  endpoint, initialData, renderInputs
}: MathFormProps<I>) {
  const [data, setData] = useState<I>(initialData);
  const [result, setResult] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(key: keyof I, value: number) {
    setData({ ...data, [key]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json: any = await res.json();

      // Gestionează diferite structuri de răspuns
      let resultValue: number;
      if (json.result !== undefined) {
        resultValue = json.result;
      } else if (json.fibonacci !== undefined) {
        resultValue = json.fibonacci;
      } else {
        console.error('Unexpected response structure:', json);
        return;
      }

      setResult(resultValue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      {renderInputs(data, onChange)}
      <button type="submit" disabled={loading}>
        {loading ? 'Calculating…' : 'Calculate'}
      </button>
      {typeof result === 'number' && (
        <div className="result">Result: {result}</div>
      )}
    </form>
  );
}
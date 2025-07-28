import { useState } from 'react';
import type { JSX } from 'react';
import type { FormEvent } from 'react';

interface MathFormProps<I> {
  endpoint: string;
  initialData?: Partial<I>;
  apiKey: string;
  renderInputs: (
    data: I,
    onChange: (k: keyof I, v: number) => void,
    onRawChange: (k: keyof I, rawValue: string) => void,
    rawValues: Record<string, string>
  ) => JSX.Element;
}

function isValidNumberFormat(
  value: string,
  context?: { isExponent?: boolean; baseValue?: number }
): { valid: boolean; error?: string } {
  const trimmed = value.trim();
  if (trimmed === "") return { valid: false, error: "Field cannot be empty" };
  if (trimmed === "-" || trimmed === "." || trimmed === "-.") {
    return { valid: false, error: "Please complete the number" };
  }

  const numberRegex = /^-?([0-9]*\.?[0-9]+|[0-9]+\.?)$/;
  if (!numberRegex.test(trimmed)) {
    return { valid: false, error: "Invalid number format" };
  }

  if (!/^-?0(\..*)?$/.test(trimmed) && /^-?0\d+/.test(trimmed)) {
    return { valid: false, error: "Leading zeros are not allowed" };
  }

  const numValue = parseFloat(trimmed);

  if (context?.isExponent && context.baseValue && context.baseValue < 0) {
    if (!Number.isInteger(numValue)) {
      return { valid: false, error: "Exponent must be integer when base is negative" };
    }
  }

  if (isNaN(numValue)) {
    return { valid: false, error: "Invalid number format" };
  }

  return { valid: true };
}

function filterInput(newValue: string, oldValue: string): string {
  if (newValue === '' || newValue.length < oldValue.length) return newValue;
  if (newValue === '-' || newValue === '.' || newValue === '-.') return newValue;

  const typingRegex = /^-?(\d*\.?\d*|\.\d*)$/;
  if (!typingRegex.test(newValue)) return oldValue;
  if ((newValue.match(/\./g) || []).length > 1) return oldValue;
  if ((newValue.match(/-/g) || []).length > 1) return oldValue;
  if (newValue.includes('-') && newValue.indexOf('-') !== 0) return oldValue;

  return newValue;
}

export function MathForm<I extends object>({
  endpoint,
  initialData = {},
  renderInputs,
  apiKey
}: MathFormProps<I>) {
  const [data, setData] = useState<I>(initialData as I);
  const [rawValues, setRawValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function onChange(key: keyof I, value: number) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function onRawChange(key: keyof I, rawValue: string) {
    const keyStr = key as string;
    const oldValue = rawValues[keyStr] || "";
    const filteredValue = filterInput(rawValue, oldValue);
    setRawValues(prev => ({ ...prev, [keyStr]: filteredValue }));

    const validation = isValidNumberFormat(
      filteredValue,
      keyStr === 'exponent' ? { isExponent: true, baseValue: data['base' as keyof I] as number } : undefined
    );

    setFieldErrors(prev => {
      const newErrors = { ...prev };
      if (!validation.valid && filteredValue !== '' && filteredValue !== '-' && filteredValue !== '.' && filteredValue !== '-.') {
        newErrors[keyStr] = validation.error || "Invalid input";
      } else {
        delete newErrors[keyStr];
      }
      return newErrors;
    });

    setError(null);

    if (validation.valid) {
      const numValue = parseFloat(filteredValue);
      onChange(key, numValue);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const allFieldsValid = Object.keys(rawValues).every(key => {
      const rawValue = rawValues[key];
      const validation = isValidNumberFormat(rawValue);
      return validation.valid;
    });

    if (!allFieldsValid) {
      setError("Please fill in all fields with valid numbers");
      return;
    }

    if (Object.keys(fieldErrors).length > 0) {
      setError("Please fix the errors in the form before submitting");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Request failed');
      }

      const json = await res.json();
      const resultValue = json.result ?? json.fibonacci ?? null;

      if (resultValue !== null) setResult(resultValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      {renderInputs(data, onChange, onRawChange, rawValues)}

      {Object.keys(fieldErrors).length > 0 && (
        <div style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>
          {Object.entries(fieldErrors).map(([field, error]) => (
            <div key={field}>⚠️ {field}: {error}</div>
          ))}
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || Object.keys(fieldErrors).length > 0}
        className={loading ? 'loading' : ''}
      >
        {loading ? 'Calculating…' : 'Calculate'}
      </button>

      {typeof result === 'number' && (
        <div className="result">Result: {result}</div>
      )}
    </form>
  );
}

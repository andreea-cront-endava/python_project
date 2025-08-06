//Afisare istoricul operațiunilor efectuate de utilizator
// Această pagină va afișa toate operațiunile efectuate de utilizator, inclusiv inputurile și rezultatele
// Utilizatorul trebuie să fie autentificat pentru a accesa această pagină

import { useEffect, useState } from 'react';

interface Operation {
  id: number;
  operation: string;
  input_data: string;
  result: string;
  timestamp: string;
}

export function MyOperations() {
  const [logs, setLogs] = useState<Operation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    fetch("/my-logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || "Failed to load logs");
        }
        return res.json();
      })
      .then(setLogs)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Operation History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {logs.length === 0 && !error && <p>No operations found.</p>}
      {logs.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {logs.map(log => (
            <li key={log.id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 6 }}>
              <strong>{log.operation}</strong> | Input: {log.input_data} → Result: <code>{log.result}</code><br />
              <small>{new Date(log.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

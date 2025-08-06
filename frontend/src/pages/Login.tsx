//pagina de Login
// Această pagină permite utilizatorilor să se autentifice cu email și parolă
// Dacă autentificarea este reușită, utilizatorul este redirecționat către pagina de funcții matematice
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      navigate("/mathfunctions");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #d6e0f5, #b4a7d6)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px 50px",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        width: 380,
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: 30, fontSize: 24, color: "#333" }}>Login</h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20, textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 8,
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 20, textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 8,
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#e74c3c', marginBottom: 20, fontWeight: 500 }}>
               {error}
            </div>
          )}

          <button type="submit" style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            backgroundColor: '#a29ef6ff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#645f7cff'}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: 20 }}>
          Don’t have an account?{' '}
          <a href="/register" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

//pagina de înregistrare
// Această pagină permite utilizatorilor să se înregistreze cu email și parolă
// Dacă înregistrarea este reușită, utilizatorul este redirecționat către pagina de login
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setSuccess(false);

  try {
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Registration failed");
    }

    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  } catch (err: any) {
    console.error("Register error:", err.message);
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
        <h2 style={{ marginBottom: 30, fontSize: 24, color: "#333" }}>Create Account</h2>

        <form onSubmit={handleRegister}>
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
            <div style={{ color: '#e74c3c', marginBottom: 15, fontWeight: 500 }}>
               {error}
            </div>
          )}

          {success && (
            <div style={{ color: '#2ecc71', marginBottom: 15, fontWeight: 500 }}>
              Account created! Redirecting…
            </div>
          )}

          <button type="submit" style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            backgroundColor: '#6c63ff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#574b90'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#6c63ff'}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: 20 }}>
          Already have an account?{' '}
          <a href="/login" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}

// AccessPage.tsx
//pagina de acces pentru introducerea cheii API
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccessPage() {
  const [enteredKey, setEnteredKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleKeySubmit = () => {
    if (enteredKey === "secret123") {
      localStorage.setItem("accessGranted", "true");
      localStorage.setItem("apiKey", enteredKey);
      navigate("/mathfunctions");
    } else {
      setError("Wrong API key!");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #d6e0f5, #b4a7d6)",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px 50px",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        width: 360,
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: 30, fontSize: 24, color: "#333" }}>
        Enter Access Key
        </h2>

        <input
          type="password"
          value={enteredKey}
          onChange={(e) => setEnteredKey(e.target.value)}
          placeholder="Enter secret key"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 15,
            boxSizing: "border-box"
          }}
        />

        {error && (
          <div style={{ color: "#cd3928ff", marginBottom: 15, fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleKeySubmit}
          style={{
            padding: "12px",
            fontSize: 16,
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#574b90"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#6c63ff"}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AccessPage;

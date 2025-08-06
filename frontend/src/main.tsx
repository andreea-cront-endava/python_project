//Sistemul de navigare
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AccessPage from "./pages/AccessPage"
import { Login } from './pages/Login.tsx'
import { Register } from './pages/Register.tsx'
import { ProtectedRoute } from './components/ProtectedRoute';
import { MyOperations } from './pages/MyLoggs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<AccessPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protejează accesul la mathfunctions */}
          <Route
            path="/mathfunctions"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path="/My-loggs"
            element={
              <ProtectedRoute>
                <MyOperations />
              </ProtectedRoute>
            }
          />

        </Routes>
   
    </BrowserRouter>
  </StrictMode>
)

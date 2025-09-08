import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import AuthModal from './components/AuthModal';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/home" replace />
              ) : (
                <LandingPage onShowAuth={() => setShowAuth(true)} />
              )
            } 
          />
          <Route 
            path="/home" 
            element={
              user ? (
                <HomePage user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
        
        {showAuth && (
          <AuthModal 
            onClose={() => setShowAuth(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
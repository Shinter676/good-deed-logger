import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ReviewedImages from './pages/ReviewedImages';
import TotalScore from './pages/TotalScore';
import Login from './pages/Login';

const PrivateRoute = ({ children, isAuthenticated, role }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role && role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/student"
            element={
              <PrivateRoute isAuthenticated={!!user}>
                <Student />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={!!user} role="admin">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviewed-images"
            element={
              <PrivateRoute isAuthenticated={!!user}>
                <ReviewedImages />
              </PrivateRoute>
            }
          />
          <Route
            path="/total-score"
            element={
              <PrivateRoute isAuthenticated={!!user}>
                <TotalScore />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ReviewedImages from './pages/ReviewedImages';
import TotalScore from './pages/TotalScore';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="App">
      {user && <NavBar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/" element={user ? <Index /> : <Navigate to="/login" />} />
        <Route path="/student" element={user && user.role === 'student' ? <Student /> : <Navigate to="/" />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
        <Route path="/reviewed-images" element={user ? <ReviewedImages /> : <Navigate to="/login" />} />
        <Route path="/total-score" element={user ? <TotalScore /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
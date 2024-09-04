import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { app, database } from './firebase'; // เพิ่มการ import database
import { ref, set, get } from 'firebase/database'; // เพิ่ม import สำหรับฟังก์ชัน Firebase Realtime Database
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ReviewedImages from './pages/ReviewedImages';
import TotalScore from './pages/TotalScore';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }

    // ตรวจสอบการเชื่อมต่อ Firebase
    if (app) {
      console.log('Firebase initialized successfully');
      setFirebaseInitialized(true);

      // ทดสอบการเขียนและอ่านข้อมูล
      const testRef = ref(database, 'test');
      set(testRef, { message: 'Test connection' })
        .then(() => {
          console.log('Test data written successfully');
          return get(testRef);
        })
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Test data read successfully:', snapshot.val());
          } else {
            console.log('No test data available');
          }
        })
        .catch((error) => {
          console.error('Error testing Firebase connection:', error);
        });
    } else {
      console.error('Firebase initialization failed');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!firebaseInitialized) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <Router>
      <div className="App">
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student" element={user && user.role === 'student' ? <Student /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/reviewed-images" element={user ? <ReviewedImages /> : <Navigate to="/login" />} />
          <Route path="/total-score" element={user ? <TotalScore /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ReviewedImages from './pages/ReviewedImages';
import TotalScore from './pages/TotalScore';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reviewed-images" element={<ReviewedImages />} />
        <Route path="/total-score" element={<TotalScore />} />
      </Routes>
    </div>
  );
}

export default App;
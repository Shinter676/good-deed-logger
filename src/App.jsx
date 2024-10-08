import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NavBar from './components/NavBar';
import Index from './pages/Index';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ReviewedImages from './pages/ReviewedImages';
import TotalScore from './pages/TotalScore';
import Login from './pages/Login';

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>เกิดข้อผิดพลาด:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="App">
        {user && <NavBar />}
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route 
            path="/" 
            element={user ? <Index /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student" 
            element={user && user.role === 'student' ? <Student /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin" 
            element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />} 
          />
          <Route 
            path="/reviewed-images" 
            element={user ? <ReviewedImages /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/total-score" 
            element={user ? <TotalScore /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
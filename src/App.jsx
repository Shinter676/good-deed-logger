import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { navItems } from "./nav-items";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { auth } from './firebase';
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              {navItems.map(({ to, page }) => (
                <Route
                  key={to}
                  path={to}
                  element={
                    <RequireAuth user={user}>
                      {page}
                    </RequireAuth>
                  }
                />
              ))}
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const RequireAuth = ({ children, user }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if ((location.pathname === '/admin' && user.email !== 'admin@example.com') || 
      (location.pathname === '/student' && user.email === 'admin@example.com')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;
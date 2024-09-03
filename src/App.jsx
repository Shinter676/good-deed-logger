import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import Layout from "./components/Layout";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const user = localStorage.getItem('user');

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
                    user ? (
                      (to === '/admin' && user !== 'admin') || (to === '/student' && user === 'admin') ? (
                        <Navigate to="/" replace />
                      ) : (
                        page
                      )
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const isAdmin = user === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredNavItems = navItems.filter(item => {
    if (item.to === '/admin' && !isAdmin) return false;
    if (item.to === '/student' && isAdmin) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex">
      <main className="flex-grow p-8">
        {children}
      </main>
      <nav className="w-64 bg-gray-100 p-6 flex flex-col justify-between">
        <div>
          {user && <p className="mb-4 font-semibold">สวัสดี, {user}</p>}
          {filteredNavItems.map((item) => (
            <Button
              key={item.to}
              asChild
              variant={location.pathname === item.to ? "default" : "ghost"}
              className="w-full justify-start mb-2"
            >
              <Link to={item.to} className="flex items-center space-x-2">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
        {user && (
          <Button onClick={handleLogout} variant="outline" className="mt-auto">
            ออกจากระบบ
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Layout;
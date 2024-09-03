import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.to}
                asChild
                variant={location.pathname === item.to ? "default" : "ghost"}
              >
                <Link to={item.to} className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
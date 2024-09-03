import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const isAdmin = user === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const filteredNavItems = navItems.filter(item => {
    if (item.to === '/admin' && !isAdmin) return false;
    if (item.to === '/student' && isAdmin) return false;
    return true;
  });

  // This would typically come from a context or state management solution
  const totalScore = 100; // Example value
  const reviewedSubmissions = [
    { id: 1, studentName: 'นักเรียน A', score: 50, reviewDate: '2024-03-01' },
    { id: 2, studentName: 'นักเรียน B', score: 50, reviewDate: '2024-03-02' },
  ]; // Example data

  return (
    <div className="min-h-screen flex">
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
      <div className="flex-grow flex">
        <main className="flex-grow p-8">
          <Outlet />
        </main>
        {isAdmin && (
          <div className="w-64 bg-gray-100 p-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>คะแนนรวม</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalScore} คะแนน</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ตรวจแล้ว</CardTitle>
              </CardHeader>
              <CardContent>
                {reviewedSubmissions.map((submission) => (
                  <div key={submission.id} className="mb-4 p-2 border-b">
                    <h4 className="font-semibold">{submission.studentName}</h4>
                    <p className="text-sm">คะแนน: {submission.score}</p>
                    <p className="text-xs text-gray-500">วันที่ตรวจ: {submission.reviewDate}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
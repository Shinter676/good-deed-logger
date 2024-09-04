import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">CHEMY×STORY</Link>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="text-white hover:text-gray-300">หน้าหลัก</Link></li>
          {user && user.role === 'student' && (
            <li><Link to="/student" className="text-white hover:text-gray-300">นักเรียน</Link></li>
          )}
          {user && user.role === 'admin' && (
            <li><Link to="/admin" className="text-white hover:text-gray-300">แอดมิน</Link></li>
          )}
          {user && (
            <>
              <li><Link to="/reviewed-images" className="text-white hover:text-gray-300">ภาพที่ตรวจแล้ว</Link></li>
              <li><Link to="/total-score" className="text-white hover:text-gray-300">คะแนนรวม</Link></li>
              <li className="text-white">สวัสดี, {user.username}</li>
              <li><Button onClick={handleLogout} variant="outline" size="sm">ออกจากระบบ</Button></li>
            </>
          )}
          {!user && (
            <li><Link to="/login" className="text-white hover:text-gray-300">เข้าสู่ระบบ</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
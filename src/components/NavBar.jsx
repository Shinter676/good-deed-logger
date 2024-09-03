import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">ระบบบันทึกความดี</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">หน้าหลัก</Link></li>
          <li><Link to="/student" className="text-white hover:text-gray-300">นักเรียน</Link></li>
          <li><Link to="/admin" className="text-white hover:text-gray-300">แอดมิน</Link></li>
          <li><Link to="/reviewed-images" className="text-white hover:text-gray-300">ภาพที่ตรวจแล้ว</Link></li>
          <li><Link to="/total-score" className="text-white hover:text-gray-300">คะแนนรวม</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
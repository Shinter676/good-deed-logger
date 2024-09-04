import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="text-center pt-20">
      <h1 className="text-5xl font-bold mb-8">CHEMY×STORY</h1>
      <p className="text-2xl text-gray-600 mb-12">บันทึกความดีของคุณในวันนี้</p>
      {user ? (
        <p className="text-xl mb-8">ยินดีต้อนรับ, {user.username}!</p>
      ) : (
        <div className="space-x-4">
          <Button asChild>
            <Link to="/login">เข้าสู่ระบบ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">เกี่ยวกับเรา</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
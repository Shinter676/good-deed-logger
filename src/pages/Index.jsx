import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">CHEMY×STORY</h1>
      <p className="text-xl text-gray-600 mb-8">บันทึกเรื่องราวเคมีของคุณวันนี้</p>
      {!user && (
        <Button onClick={() => navigate('/login')}>เข้าสู่ระบบ</Button>
      )}
    </div>
  );
};

export default Index;
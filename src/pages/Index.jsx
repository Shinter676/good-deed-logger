import React from 'react';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ระบบบันทึกความดี</h1>
        <p className="text-xl text-gray-600 mb-8">เข้าสู่ระบบเพื่อบันทึกความดีของคุณ</p>
        <div className="space-x-4">
          <Button onClick={() => navigate('/login')}>เข้าสู่ระบบ</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
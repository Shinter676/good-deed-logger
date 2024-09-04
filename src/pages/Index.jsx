import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  return (
    <div className="text-center pt-20">
      <h1 className="text-5xl font-bold mb-8">CHEMY×STORY</h1>
      <p className="text-2xl text-gray-600 mb-12">บันทึกความดีของคุณในวันนี้</p>
      {!user && (
        <Button onClick={() => navigate('/login')} className="text-lg px-6 py-3">เข้าสู่ระบบ</Button>
      )}
    </div>
  );
};

export default Index;
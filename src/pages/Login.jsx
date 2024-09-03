import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate(user === 'admin' ? '/admin' : '/student');
    }
  }, [navigate]);

  const handleLogin = () => {
    if ((username === 'test' && password === '123') || (username === 'admin' && password === '123')) {
      localStorage.setItem('user', username);
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${username}`,
      });
      navigate(username === 'admin' ? '/admin' : '/student');
    } else {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>
        <Input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />
        <Button onClick={handleLogin} className="w-full">เข้าสู่ระบบ</Button>
      </div>
    </div>
  );
};

export default Login;
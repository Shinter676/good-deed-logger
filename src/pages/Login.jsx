import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === 'admin' && password === '123') || (username === 'test' && password === '123')) {
      localStorage.setItem('user', username);
      navigate(username === 'admin' ? '/admin' : '/student');
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${username === 'admin' ? 'แอดมิน' : 'นักเรียน'}`,
      });
    } else {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
            required
          />
          <Input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6"
            required
          />
          <Button type="submit" className="w-full mb-4">เข้าสู่ระบบ</Button>
        </form>
        <div className="text-sm text-gray-600">
          <p>แอดมิน: admin / 123</p>
          <p>นักเรียน: test / 123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
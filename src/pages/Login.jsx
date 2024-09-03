import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${email}`,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: error.message,
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
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
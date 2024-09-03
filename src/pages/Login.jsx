import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('user', user.email === 'admin@example.com' ? 'admin' : 'student');
        navigate(user.email === 'admin@example.com' ? '/admin' : '/student');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${username}`,
      });
      localStorage.setItem('user', userCredential.user.email === 'admin@example.com' ? 'admin' : 'student');
    } catch (error) {
      console.error("Authentication error:", error);
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
            placeholder="อีเมล"
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
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">รายชื่อผู้ใช้และรหัสผ่านที่ใช้ได้:</h3>
          <ul className="list-disc pl-5">
            <li>อีเมล: admin@example.com, รหัสผ่าน: admin123</li>
            <li>อีเมล: student1@example.com, รหัสผ่าน: student123</li>
            <li>อีเมล: student2@example.com, รหัสผ่าน: student456</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
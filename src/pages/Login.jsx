import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = `${username}@example.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // สร้างข้อมูลผู้ใช้ใหม่ถ้ายังไม่มี
        const newUserData = {
          username: username,
          role: username === 'admin' ? 'admin' : 'student',
          totalScore: 0
        };
        await setDoc(doc(db, 'users', user.uid), newUserData);
        userDoc = { data: () => newUserData };
      }

      const userData = userDoc.data();
      onLogin({ username: userData.username, role: userData.role });
      navigate(userData.role === 'admin' ? '/admin' : '/student');
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: `ยินดีต้อนรับ ${userData.username}`,
      });
    } catch (error) {
      console.error("Error logging in:", error);
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
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "สมัครสมาชิกสำเร็จ",
          description: "บัญชีของคุณถูกสร้างแล้ว",
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: `ยินดีต้อนรับ ${email}`,
        });
      }
      localStorage.setItem('user', userCredential.user.email === 'admin@example.com' ? 'admin' : 'student');
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: isSignUp ? "สมัครสมาชิกไม่สำเร็จ" : "เข้าสู่ระบบไม่สำเร็จ",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{isSignUp ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</h2>
        <form onSubmit={handleAuth}>
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
          <Button type="submit" className="w-full mb-4">{isSignUp ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</Button>
        </form>
        <Button onClick={() => setIsSignUp(!isSignUp)} variant="outline" className="w-full">
          {isSignUp ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
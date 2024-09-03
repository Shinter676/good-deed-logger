import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeUsers = async () => {
      const adminRef = ref(database, 'users/admin_example_com');
      const studentRef = ref(database, 'users/student_example_com');

      const adminSnapshot = await get(adminRef);
      const studentSnapshot = await get(studentRef);

      if (!adminSnapshot.exists()) {
        try {
          await createUserWithEmailAndPassword(auth, 'admin@example.com', 'adminpassword');
          await set(adminRef, { role: 'admin' });
        } catch (error) {
          console.error("Error creating admin user:", error);
        }
      }

      if (!studentSnapshot.exists()) {
        try {
          await createUserWithEmailAndPassword(auth, 'student@example.com', 'studentpassword');
          await set(studentRef, { role: 'student' });
        } catch (error) {
          console.error("Error creating student user:", error);
        }
      }
    };

    initializeUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userRef = ref(database, `users/${email.replace(/\./g, '_')}`);
      const userSnapshot = await get(userRef);
      
      if (userSnapshot.exists()) {
        const userRole = userSnapshot.val().role;
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: `ยินดีต้อนรับ ${email} (${userRole})`,
        });

        localStorage.setItem('user', email);
        localStorage.setItem('role', userRole);

        navigate(userRole === 'admin' ? '/admin' : '/student');
      } else {
        throw new Error("User role not found");
      }
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
        <div className="text-sm text-gray-600">
          <p>แอดมิน: admin@example.com / adminpassword</p>
          <p>นักเรียน: student@example.com / studentpassword</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
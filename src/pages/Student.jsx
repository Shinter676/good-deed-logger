import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Student = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'student') {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
    // Load pending submissions from localStorage
    const storedSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions')) || [];
    setPendingSubmissions(storedSubmissions);
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (image && description && user) {
      const newSubmission = {
        id: Date.now(),
        userId: user.username,
        image,
        description,
        date: new Date().toISOString(),
        score: 0
      };
      const updatedSubmissions = [...pendingSubmissions, newSubmission];
      setPendingSubmissions(updatedSubmissions);
      localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
      toast({
        title: "อัพโหลดสำเร็จ",
        description: "รูปภาพและข้อความของคุณถูกส่งไปยังแอดมินเพื่อตรวจสอบแล้ว",
      });
      setImage(null);
      setDescription('');
    } else {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาเลือกรูปภาพและใส่ข้อความก่อนส่ง",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">กิจกรรมทำความดี - เก็บขยะ</h2>
      <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {image && (
        <img src={image} alt="Preview" className="mb-4 max-w-full h-auto rounded" />
      )}
      <Textarea
        placeholder="อธิบายกิจกรรมความดีของคุณ"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleSubmit} className="mb-8">ส่งรูปภาพและข้อความ</Button>

      <h3 className="text-xl font-semibold mb-4">รอการตรวจ</h3>
      {pendingSubmissions.map((submission) => (
        <div key={submission.id} className="mb-6 p-4 border rounded">
          <img src={submission.image} alt="Submission" className="mb-2 max-w-sm h-auto rounded" />
          <p className="mb-2">{submission.description}</p>
          <p>วันที่ส่ง: {new Date(submission.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Student;
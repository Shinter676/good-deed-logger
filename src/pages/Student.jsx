import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Student = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

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
    if (image && description) {
      // Here you would typically send the image and description to a server
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
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
      <Button onClick={handleSubmit} className="mr-4">ส่งรูปภาพและข้อความ</Button>
      <Button onClick={handleLogout} variant="outline">ออกจากระบบ</Button>
    </div>
  );
};

export default Student;
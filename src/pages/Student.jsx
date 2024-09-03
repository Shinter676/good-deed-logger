import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const Student = () => {
  const [image, setImage] = useState(null);
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
    if (image) {
      // Here you would typically send the image to a server
      // For this example, we'll just show a success message
      toast({
        title: "อัพโหลดสำเร็จ",
        description: "รูปภาพของคุณถูกส่งไปยังแอดมินเพื่อตรวจสอบแล้ว",
      });
      setImage(null);
    } else {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาเลือกรูปภาพก่อนส่ง",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">บันทึกความดี - เก็บขยะ</h2>
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
        {image && (
          <img src={image} alt="Preview" className="mb-4 max-w-full h-auto rounded" />
        )}
        <Button onClick={handleSubmit} className="mr-4">ส่งรูปภาพ</Button>
        <Button onClick={handleLogout} variant="outline">ออกจากระบบ</Button>
      </div>
    </div>
  );
};

export default Student;
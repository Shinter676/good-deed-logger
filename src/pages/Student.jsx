import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { db, storage, submissionsCollection } from '../firebase';
import { addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

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
      fetchPendingSubmissions(storedUser.username);
    }
  }, [navigate]);

  const fetchPendingSubmissions = async (userId) => {
    const q = query(submissionsCollection, where("userId", "==", userId), where("score", "==", 0));
    const querySnapshot = await getDocs(q);
    const submissions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPendingSubmissions(submissions);
  };

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

  const handleSubmit = async () => {
    if (image && description && user) {
      try {
        // อัพโหลดรูปภาพไปยัง Firebase Storage
        const storageRef = ref(storage, `submissions/${Date.now()}`);
        await uploadString(storageRef, image, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);

        // เพิ่มข้อมูลการส่งงานลงใน Firestore
        const submissionData = {
          userId: user.username,
          image: imageUrl,
          description,
          date: new Date(),
          score: 0
        };

        const docRef = await addDoc(submissionsCollection, submissionData);

        // เพิ่มการส่งงานใหม่ลงใน state ของ pendingSubmissions
        setPendingSubmissions(prevSubmissions => [
          { id: docRef.id, ...submissionData },
          ...prevSubmissions
        ]);

        toast({
          title: "อัพโหลดสำเร็จ",
          description: "รูปภาพและข้อความของคุณถูกส่งไปยังแอดมินเพื่อตรวจสอบแล้ว",
        });

        setImage(null);
        setDescription('');
      } catch (error) {
        console.error("Error submitting:", error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
          variant: "destructive",
        });
      }
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
      <h2 className="text-2xl font-bold mb-6">CHEMY×STORY - บันทึกเรื่องราวเคมี</h2>
      <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {image && (
        <img src={image} alt="Preview" className="mb-4 max-w-full h-auto rounded" />
      )}
      <Textarea
        placeholder="อธิบายเรื่องราวเคมีของคุณ"
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
          <p>วันที่ส่ง: {submission.date instanceof Date ? submission.date.toLocaleDateString() : new Date(submission.date.seconds * 1000).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Student;
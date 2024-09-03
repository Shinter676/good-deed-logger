import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, studentName: 'นักเรียน A', image: '/placeholder.svg', description: 'เก็บขยะที่สวนสาธารณะ', score: 0 },
    { id: 2, studentName: 'นักเรียน B', image: '/placeholder.svg', description: 'ทำความสะอาดชายหาด', score: 0 },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScoreChange = (id, score) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, score: parseInt(score) || 0 } : sub
    ));
  };

  const handleSubmitScores = () => {
    // Here you would typically send the scores to a server
    toast({
      title: "บันทึกคะแนนสำเร็จ",
      description: "คะแนนทั้งหมดถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">หน้าแอดมิน - ตรวจคะแนน</h2>
      {submissions.map((submission) => (
        <div key={submission.id} className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">{submission.studentName}</h3>
          <img src={submission.image} alt="Submission" className="mb-2 max-w-sm h-auto rounded" />
          <p className="mb-2">{submission.description}</p>
          <div className="flex items-center">
            <Input
              type="number"
              value={submission.score}
              onChange={(e) => handleScoreChange(submission.id, e.target.value)}
              className="w-20 mr-2"
              min="0"
              max="100"
            />
            <span>คะแนน</span>
          </div>
        </div>
      ))}
      <Button onClick={handleSubmitScores} className="mr-4">บันทึกคะแนน</Button>
      <Button onClick={handleLogout} variant="outline">ออกจากระบบ</Button>
    </div>
  );
};

export default Admin;
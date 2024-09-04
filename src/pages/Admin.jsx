import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    // Load pending submissions from localStorage
    const savedSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions')) || [];
    setPendingSubmissions(savedSubmissions);
  }, [navigate]);

  const handleScoreChange = (id, score) => {
    setPendingSubmissions(pendingSubmissions.map(sub => 
      sub.id === id ? { ...sub, score: parseInt(score) || 0 } : sub
    ));
  };

  const handleSubmitScores = () => {
    // Update localStorage with scored submissions
    localStorage.setItem('pendingSubmissions', JSON.stringify(pendingSubmissions));
    toast({
      title: "บันทึกคะแนนสำเร็จ",
      description: "คะแนนถูกบันทึกและอัพเดทในระบบแล้ว",
    });
    // Remove scored submissions from the pending list
    const unscored = pendingSubmissions.filter(sub => sub.score === 0);
    setPendingSubmissions(unscored);
    localStorage.setItem('pendingSubmissions', JSON.stringify(unscored));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">หน้าแอดมิน - ตรวจคะแนน</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">รอการตรวจ</h3>
        {pendingSubmissions.map((submission) => (
          <div key={submission.id} className="mb-6 p-4 border rounded">
            <h4 className="text-lg font-semibold mb-2">{submission.studentEmail}</h4>
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
        {pendingSubmissions.length > 0 && (
          <Button onClick={handleSubmitScores}>บันทึกคะแนน</Button>
        )}
      </div>
    </div>
  );
};

export default Admin;
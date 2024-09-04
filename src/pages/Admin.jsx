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
    const savedSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions')) || [];
    setPendingSubmissions(savedSubmissions);
  }, [navigate]);

  const handleScoreChange = (id, score) => {
    setPendingSubmissions(pendingSubmissions.map(sub => 
      sub.id === id ? { ...sub, score: parseInt(score) || 0 } : sub
    ));
  };

  const handleSubmitScores = () => {
    const scoredSubmissions = pendingSubmissions.filter(sub => sub.score > 0);
    const remainingSubmissions = pendingSubmissions.filter(sub => sub.score === 0);

    // Update reviewedSubmissions in localStorage
    const existingReviewedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions')) || [];
    const updatedReviewedSubmissions = [...existingReviewedSubmissions, ...scoredSubmissions];
    localStorage.setItem('reviewedSubmissions', JSON.stringify(updatedReviewedSubmissions));

    // Update pendingSubmissions in localStorage
    localStorage.setItem('pendingSubmissions', JSON.stringify(remainingSubmissions));

    // Update total scores
    const totalScores = {};
    updatedReviewedSubmissions.forEach(sub => {
      if (totalScores[sub.studentEmail]) {
        totalScores[sub.studentEmail] += sub.score;
      } else {
        totalScores[sub.studentEmail] = sub.score;
      }
    });
    localStorage.setItem('totalScores', JSON.stringify(totalScores));

    setPendingSubmissions(remainingSubmissions);
    toast({
      title: "บันทึกคะแนนสำเร็จ",
      description: "คะแนนถูกบันทึกและอัพเดทในระบบแล้ว",
    });
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
        {pendingSubmissions.length === 0 && (
          <p>ไม่มีภาพรอการตรวจ</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
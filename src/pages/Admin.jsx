import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState([
    { id: 1, studentName: 'นักเรียน A', image: '/placeholder.svg', description: 'เก็บขยะที่สวนสาธารณะ', score: 0 },
    { id: 2, studentName: 'นักเรียน B', image: '/placeholder.svg', description: 'ทำความสะอาดชายหาด', score: 0 },
  ]);
  const [reviewedSubmissions, setReviewedSubmissions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const handleScoreChange = (id, score) => {
    setPendingSubmissions(pendingSubmissions.map(sub => 
      sub.id === id ? { ...sub, score: parseInt(score) || 0 } : sub
    ));
  };

  const handleSubmitScores = () => {
    const newReviewedSubmissions = pendingSubmissions.map(sub => ({
      ...sub,
      reviewDate: new Date().toLocaleDateString()
    }));
    setReviewedSubmissions([...reviewedSubmissions, ...newReviewedSubmissions]);
    setPendingSubmissions([]);
    const newTotalScore = totalScore + newReviewedSubmissions.reduce((sum, sub) => sum + sub.score, 0);
    setTotalScore(newTotalScore);
    toast({
      title: "บันทึกคะแนนสำเร็จ",
      description: "คะแนนทั้งหมดถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">หน้าแอดมิน - ตรวจคะแนน</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">รอการตรวจ</h3>
        {pendingSubmissions.map((submission) => (
          <div key={submission.id} className="mb-6 p-4 border rounded">
            <h4 className="text-lg font-semibold mb-2">{submission.studentName}</h4>
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
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">ตรวจแล้ว</h3>
        {reviewedSubmissions.map((submission) => (
          <div key={submission.id} className="mb-6 p-4 border rounded">
            <h4 className="text-lg font-semibold mb-2">{submission.studentName}</h4>
            <img src={submission.image} alt="Submission" className="mb-2 max-w-sm h-auto rounded" />
            <p className="mb-2">{submission.description}</p>
            <p>คะแนน: {submission.score}</p>
            <p>วันที่ตรวจ: {submission.reviewDate}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">คะแนนรวม</h3>
        <p className="text-2xl font-bold">{totalScore} คะแนน</p>
      </div>
    </div>
  );
};

export default Admin;
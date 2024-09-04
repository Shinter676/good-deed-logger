import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    // Clear pending submissions
    localStorage.removeItem('pendingSubmissions');
    setPendingSubmissions([]);
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
    localStorage.setItem('reviewedSubmissions', JSON.stringify(scoredSubmissions));

    // Update pendingSubmissions in localStorage
    localStorage.setItem('pendingSubmissions', JSON.stringify(remainingSubmissions));

    // Update total scores
    const totalScores = {};
    scoredSubmissions.forEach(sub => {
      if (totalScores[sub.userId]) {
        totalScores[sub.userId] += sub.score;
      } else {
        totalScores[sub.userId] = sub.score;
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ลำดับ</TableHead>
              <TableHead>รูปภาพ</TableHead>
              <TableHead>ชื่อเรื่อง</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead>ไอดีผู้ใช้</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingSubmissions.map((submission, index) => (
              <TableRow key={submission.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={submission.image} alt="Submission" className="w-20 h-20 object-cover rounded" />
                </TableCell>
                <TableCell>{submission.description}</TableCell>
                <TableCell>{new Date(submission.date).toLocaleDateString('th-TH')}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={submission.score}
                    onChange={(e) => handleScoreChange(submission.id, e.target.value)}
                    className="w-20"
                    min="0"
                    max="100"
                  />
                </TableCell>
                <TableCell>{submission.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pendingSubmissions.length > 0 && (
          <Button onClick={handleSubmitScores} className="mt-4">บันทึกคะแนน</Button>
        )}
        {pendingSubmissions.length === 0 && (
          <p>ไม่มีภาพรอการตรวจ</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
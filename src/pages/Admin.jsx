import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { auth, database } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

const Admin = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && user.email === 'admin@example.com') {
        const submissionsRef = ref(database, 'submissions');
        onValue(submissionsRef, (snapshot) => {
          const data = snapshot.val();
          const submissions = data ? Object.entries(data).map(([id, sub]) => ({...sub, id})).filter(sub => sub.score === 0) : [];
          setPendingSubmissions(submissions);
        });
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleScoreChange = (id, score) => {
    setPendingSubmissions(pendingSubmissions.map(sub => 
      sub.id === id ? { ...sub, score: parseInt(score) || 0 } : sub
    ));
  };

  const handleSubmitScores = () => {
    const updates = {};
    pendingSubmissions.forEach(sub => {
      if (sub.score > 0) {
        updates[`/submissions/${sub.id}/score`] = sub.score;
      }
    });

    update(ref(database), updates)
      .then(() => {
        toast({
          title: "บันทึกคะแนนสำเร็จ",
          description: "คะแนนถูกบันทึกและอัพเดทในฐานข้อมูลแล้ว",
        });
      })
      .catch((error) => {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถบันทึกคะแนนได้ กรุณาลองใหม่อีกครั้ง",
          variant: "destructive",
        });
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
      </div>
    </div>
  );
};

export default Admin;
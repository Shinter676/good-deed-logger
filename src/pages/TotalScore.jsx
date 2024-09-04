import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const pendingSubmissions = JSON.parse(localStorage.getItem('pendingSubmissions')) || [];
    const scoredSubmissions = pendingSubmissions.filter(sub => sub.score > 0);
    
    const totalScores = scoredSubmissions.reduce((acc, sub) => {
      const email = sub.studentEmail || 'Unknown';
      acc[email] = (acc[email] || 0) + sub.score;
      return acc;
    }, {});

    setScores(totalScores);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">คะแนนรวม</h2>
      {Object.entries(scores).map(([email, totalScore]) => (
        <div key={email} className="mb-4">
          <h3 className="text-xl font-semibold">{email}</h3>
          <p className="ml-4">คะแนนรวม: {totalScore}</p>
        </div>
      ))}
      {Object.keys(scores).length === 0 && (
        <p>ยังไม่มีคะแนนที่บันทึก</p>
      )}
    </div>
  );
};

export default TotalScore;
import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const savedTotalScores = JSON.parse(localStorage.getItem('totalScores')) || {};
    setScores(savedTotalScores);
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
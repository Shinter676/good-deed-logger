import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const reviewedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions') || '[]');
    const newTotalScore = reviewedSubmissions.reduce((sum, submission) => sum + submission.score, 0);
    setTotalScore(newTotalScore);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">คะแนนรวม</h2>
      <p className="text-4xl font-bold">{totalScore} คะแนน</p>
    </div>
  );
};

export default TotalScore;
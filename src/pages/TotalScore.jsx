import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const reviewedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions') || '[]');
    const newScores = reviewedSubmissions.reduce((acc, submission) => {
      if (!acc[submission.studentName]) {
        acc[submission.studentName] = 0;
      }
      acc[submission.studentName] += submission.score;
      return acc;
    }, {});
    setScores(newScores);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">คะแนนรวม</h2>
      {Object.entries(scores).map(([studentName, totalScore]) => (
        <div key={studentName} className="mb-4">
          <h3 className="text-xl font-semibold">{studentName}</h3>
          <p className="ml-4">คะแนนรวม: {totalScore}</p>
        </div>
      ))}
    </div>
  );
};

export default TotalScore;
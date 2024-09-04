import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    // In a real application, you would fetch scores from a backend here
    // For now, we'll use mock data
    setScores({
      'student@example.com': 150,
      'student2@example.com': 120,
    });
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
    </div>
  );
};

export default TotalScore;
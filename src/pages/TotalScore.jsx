import React, { useState, useEffect } from 'react';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const reviewedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions') || '[]');
    const newScores = reviewedSubmissions.reduce((acc, submission) => {
      if (!acc[submission.studentName]) {
        acc[submission.studentName] = [];
      }
      acc[submission.studentName].push(submission.score);
      return acc;
    }, {});
    setScores(newScores);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">คะแนนรวม</h2>
      {Object.entries(scores).map(([studentName, studentScores]) => (
        <div key={studentName} className="mb-4">
          <h3 className="text-xl font-semibold">{studentName}</h3>
          {studentScores.map((score, index) => (
            <p key={index} className="ml-4">
              {index + 1}/{studentScores.length} = {score}
            </p>
          ))}
          <p className="font-bold ml-4">
            คะแนนรวม: {studentScores.reduce((sum, score) => sum + score, 0)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TotalScore;
import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const submissionsRef = ref(database, 'submissions');
        onValue(submissionsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const newScores = Object.values(data).reduce((acc, submission) => {
              if (!acc[submission.studentEmail]) {
                acc[submission.studentEmail] = 0;
              }
              acc[submission.studentEmail] += submission.score;
              return acc;
            }, {});
            setScores(newScores);
          }
        });
      }
    });

    return () => unsubscribe();
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
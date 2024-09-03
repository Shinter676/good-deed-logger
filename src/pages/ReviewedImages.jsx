import React, { useState, useEffect } from 'react';

const ReviewedImages = () => {
  const [reviewedSubmissions, setReviewedSubmissions] = useState([]);

  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions') || '[]');
    setReviewedSubmissions(storedSubmissions);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ภาพที่ตรวจแล้ว</h2>
      {reviewedSubmissions.map((submission) => (
        <div key={submission.id} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2">{submission.studentName}</h3>
          <img src={submission.image} alt="Reviewed Submission" className="mb-2 max-w-sm h-auto rounded" />
          <p className="mb-2">{submission.description}</p>
          <p>วันที่ส่ง: {submission.date}</p>
          <p>คะแนน: {submission.score}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewedImages;
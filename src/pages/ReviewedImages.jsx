import React, { useState, useEffect } from 'react';

const ReviewedImages = () => {
  const [reviewedSubmissions, setReviewedSubmissions] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch reviewed submissions from a backend here
    // For now, we'll use mock data
    setReviewedSubmissions([
      { id: 1, studentName: 'นักเรียน A', image: '/placeholder.svg', description: 'เก็บขยะที่สวนสาธารณะ', date: '2023-03-15', score: 80 },
      { id: 2, studentName: 'นักเรียน B', image: '/placeholder.svg', description: 'ช่วยเหลือผู้สูงอายุข้ามถนน', date: '2023-03-16', score: 90 },
    ]);
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
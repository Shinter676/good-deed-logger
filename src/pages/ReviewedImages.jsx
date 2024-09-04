import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ReviewedImages = () => {
  const [reviewedSubmissions, setReviewedSubmissions] = useState([]);

  useEffect(() => {
    const savedReviewedSubmissions = JSON.parse(localStorage.getItem('reviewedSubmissions')) || [];
    setReviewedSubmissions(savedReviewedSubmissions);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ภาพที่ตรวจแล้ว</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ลำดับ</TableHead>
            <TableHead>รูปภาพ</TableHead>
            <TableHead>ชื่อเรื่อง</TableHead>
            <TableHead>วันที่</TableHead>
            <TableHead>คะแนน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviewedSubmissions.map((submission, index) => (
            <TableRow key={submission.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={submission.image} alt="Reviewed Submission" className="w-20 h-20 object-cover rounded" />
              </TableCell>
              <TableCell>{submission.description}</TableCell>
              <TableCell>{new Date(submission.date).toLocaleDateString('th-TH')}</TableCell>
              <TableCell>{submission.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {reviewedSubmissions.length === 0 && (
        <p>ยังไม่มีภาพที่ตรวจแล้ว</p>
      )}
    </div>
  );
};

export default ReviewedImages;
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TotalScore = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const savedTotalScores = JSON.parse(localStorage.getItem('totalScores')) || {};
    setScores(savedTotalScores);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">คะแนนรวม</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ไอดีผู้ใช้</TableHead>
            <TableHead>คะแนนรวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(scores).map(([userId, totalScore]) => (
            <TableRow key={userId}>
              <TableCell>{userId}</TableCell>
              <TableCell>{totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {Object.keys(scores).length === 0 && (
        <p>ยังไม่มีคะแนนที่บันทึก</p>
      )}
    </div>
  );
};

export default TotalScore;
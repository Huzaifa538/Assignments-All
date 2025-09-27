import React from "react";

export default function ReportCard({ student, score }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Report Card</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Roll:</strong> {student.roll}</p>
      <p><strong>Class:</strong> {student.cls}</p>
      <p className="mt-2 text-lg"><strong>Score:</strong> {score} / 3</p>
    </div>
  );
}

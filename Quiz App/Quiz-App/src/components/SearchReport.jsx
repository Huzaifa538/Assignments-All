import React, { useState } from "react";

export default function SearchReport({ records }) {
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const searchRoll = roll.trim();

    // ✅ Check if input contains only digits
    if (!/^\d+$/.test(searchRoll)) {
      setResult("invalid");
      return;
    }

    // ✅ Search the record
    setResult(records[searchRoll] || null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">Search Report</h2>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleSearch}
        className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>

      {/* 📌 Conditionally display result or errors */}
      {result === "invalid" ? (
        <p className="mt-4 text-red-500 text-center">
          ❌ Invalid Roll Number. Only numbers allowed.
        </p>
      ) : result ? (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Roll:</strong> {result.roll}</p>
          <p><strong>Class:</strong> {result.cls}</p>
          <p><strong>Score:</strong> {result.score} / 3</p>
        </div>
      ) : (
        roll && <p className="mt-4 text-red-500 text-center">No record found ❌</p>
      )}
    </div>
  );
}

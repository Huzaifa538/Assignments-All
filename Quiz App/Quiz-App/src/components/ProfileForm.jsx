import React, { useState } from "react";

export default function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [cls, setCls] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(1, 8); // unique ID
    onSubmit({ id, name, roll, cls });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">Student Profile</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Roll Number"
        className="w-full p-2 border rounded-lg"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Class"
        className="w-full p-2 border rounded-lg"
        value={cls}
        onChange={(e) => setCls(e.target.value)}
        required
      />
      <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
        Start Test
      </button>
    </form>
  );
}

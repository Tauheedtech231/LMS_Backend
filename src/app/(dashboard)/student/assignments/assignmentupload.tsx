"use client";
import { useState } from "react";

export default function AssignmentUpload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-semibold mb-3">Upload Assignment</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <button
        disabled={!file}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        Submit
      </button>
    </div>
  );
}

import React from "react";
export default function EditButton({ handleChange }) {
  return (
    <button onClick={handleChange} className="bg-blue-700 px-2 py-1 text-white">
      Edit
    </button>
  );
}

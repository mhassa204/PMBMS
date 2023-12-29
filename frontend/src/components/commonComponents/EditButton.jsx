import React from "react";
export default function EditButton({ handleChange }) {
  return (
    <button onClick={handleChange} className="bg-blue-300">
      Edit
    </button>
  );
}

import React from "react";
export default function DeleteButton({ handleChange }) {
  return (
    <button onClick={handleChange} className="bg-red-600 px-2 py-1 text-white">
      Delete
    </button>
  );
}

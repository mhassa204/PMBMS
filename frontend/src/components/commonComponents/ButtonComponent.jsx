import React from "react";

export default function ButtonComponent({ name, type }) {
  return (
    <div className="w-full mt-5 flex items-center justify-end">
      <button
        type={type ? type : ""}
        className="bg-blue-500 hover:bg-darkblue-700 text-white font-bold py-2 px-4 rounded-sm"
      >
        {name}
      </button>
    </div>
  );
}

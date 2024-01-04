import React from "react";
import "@src/styles/landingPage.css";

export default function ButtonComponent({ name, type }) {
  return (
    <div className="w-full mt-5 flex items-center justify-end">
      <button
        type={type ? type : ""}
        className="bg-[#0b6323] hover:bg-darkblue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        {name}
      </button>
    </div>
  );
}

import React from "react";

export default function DataLabel({ label }) {
  return (
    <div className="px-4 py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-800 text-center font-bold">
      {label}
    </div>
  );
}
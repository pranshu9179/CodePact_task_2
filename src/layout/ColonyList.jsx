// src/layout/ColonyList.jsx
import React from "react";

export default function ColonyList({ colonies = [], onBack, onSelectColony }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-400 font-medium shadow text-md "
        >
          ← Back
        </button>
        <p className="text-sm font-bold text-gray-800">Colonies</p>
        <div className="w-10" /> {/* spacer */}
      </div>

      {colonies.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
        >
          <div>
            <p className="text-md font-medium text-sky-700">{c.name}</p>
            <p className="text-xs text-gray-500">Click to see customers</p>
          </div>
          <button
            onClick={() => onSelectColony(c)}
            className="px-3 py-2 bg-sky-500 text-white font-medium rounded-xl text-sm shadow hover:brightness-95"
          >
            View Users
          </button>
        </div>
      ))}
    </div>
  );
}


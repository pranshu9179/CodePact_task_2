// src/layout/AreaList.jsx

export default function AreaList({ areas = [], onSelectArea }) {
  return (
    <div className="space-y-3">
      {areas.map((area) => (
        <div
          key={area.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
        >
          <div>
            <p className="text-lg font-semibold text-sky-700">{area.name}</p>
            <p className="text-xs text-gray-500">Tap to view colonies</p>
          </div>
          <button
            onClick={() => onSelectArea(area)}
            className="px-3 py-2 bg-sky-500 text-white rounded-xl text-sm shadow hover:brightness-95"
          >
            View Colonies
          </button>
        </div>
      ))}
    </div>
  );
}

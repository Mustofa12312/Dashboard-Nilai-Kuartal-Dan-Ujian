"use client";

import { useState } from "react";

export default function ClassChart({ data = [] }) {
  const [filter, setFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);

  const filteredData = data.map((item) => {
    if (filter === "all") return item;
    return {
      ...item,
      average: filter === "kuartal" ? item.average_kuartal : item.average_ujian,
    };
  });

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">
          Nilai & Progress Upload per Kelas (Hari Ini)
        </h3>

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="all">Semua</option>
          <option value="kuartal">Kuartal</option>
          <option value="ujian">Ujian Akhir</option>
        </select>
      </div>

      {/* LIST */}
      {filteredData.map((item) => (
        <div
          key={item.class}
          className="space-y-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
          onClick={() => setSelectedClass(item)}
        >
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.class}</span>
            <span>
              Avg: {item.average} | Upload: {item.progress}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${item.average}%` }}
            />
          </div>

          <div className="w-full bg-gray-100 rounded h-2">
            <div
              className="bg-green-600 h-2 rounded"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}

      {/* DETAIL */}
      {selectedClass && (
        <ClassDetail
          data={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}

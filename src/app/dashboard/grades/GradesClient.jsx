"use client";

import { useState } from "react";
import GradeTable from "../../../features/grades/GradeTable";

export default function GradesClient({ kuartal, ujianAkhir }) {
  const [activeTab, setActiveTab] = useState("kuartal");

  return (
    <div className="h-full flex flex-col">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-gray-100 pb-4">
        <h2 className="text-2xl font-bold">Data Nilai</h2>
        <p className="text-sm text-gray-500">
          Input dan manajemen nilai santri
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab("kuartal")}
            className={`px-4 py-2 rounded
              ${
                activeTab === "kuartal"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }
            `}
          >
            Nilai Kuartal
          </button>

          <button
            onClick={() => setActiveTab("ujian")}
            className={`px-4 py-2 rounded
              ${
                activeTab === "ujian"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }
            `}
          >
            Nilai Ujian Akhir
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto pt-6">
        {activeTab === "kuartal" && <GradeTable data={kuartal} />}
        {activeTab === "ujian" && <GradeTable data={ujianAkhir} />}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import StudentTable from "../../../features/students/StudentTable";
import StudentFormKuartal from "../../../features/students/StudentFormKuartal";
import StudentFormUjianAkhir from "../../../features/students/StudentFormUjianAkhir";

export default function StudentsClient({ kuartal, ujianAkhir }) {
  const [activeTab, setActiveTab] = useState("kuartal");

  return (
    <div className="h-full flex flex-col">
      {/* ================= STICKY HEADER ================= */}
      <div className="sticky top-0 z-10 bg-gray-100 pb-4">
        {/* PAGE TITLE */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Data Santri</h2>
          <p className="text-gray-500 text-sm">
            Kelola santri berdasarkan jenis penilaian
          </p>
        </div>

        {/* TOGGLE BUTTON */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kuartal")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${
                activeTab === "kuartal"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
          >
            Santri Kuartal
          </button>

          <button
            onClick={() => setActiveTab("ujian")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${
                activeTab === "ujian"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
          >
            Santri Ujian Akhir
          </button>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="flex-1 overflow-y-auto pt-6 space-y-6">
        {activeTab === "kuartal" && (
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-medium mb-3">Tambah Santri Kuartal</h4>
                <StudentFormKuartal />
              </div>

              <div className="lg:col-span-2">
                <StudentTable data={kuartal} />
              </div>
            </div>
          </section>
        )}

        {activeTab === "ujian" && (
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-medium mb-3">Tambah Santri Ujian Akhir</h4>
                <StudentFormUjianAkhir />
              </div>

              <div className="lg:col-span-2">
                <StudentTable data={ujianAkhir} showAddress />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

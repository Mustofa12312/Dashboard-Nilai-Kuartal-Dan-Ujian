"use client";

import { useState } from "react";
import ClassSetting from "../../../features/settings/ClassSetting";
import SubjectSetting from "../../../features/settings/SubjectSetting";
import AddressSetting from "../../../features/settings/AddressSetting";

export default function SettingsClient() {
  const [tab, setTab] = useState("kelas");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan</h2>

      {/* TAB */}
      <div className="flex gap-2">
        {[
          { id: "kelas", label: "Kelas" },
          { id: "mapel", label: "Mata Pelajaran" },
          { id: "alamat", label: "Alamat" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded ${
              tab === t.id ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {tab === "kelas" && <ClassSetting />}
      {tab === "mapel" && <SubjectSetting />}
      {tab === "alamat" && <AddressSetting />}
    </div>
  );
}

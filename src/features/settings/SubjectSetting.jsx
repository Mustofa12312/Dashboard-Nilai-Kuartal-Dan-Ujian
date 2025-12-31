"use client";

import { useEffect, useState } from "react";
import { getSubjects, addSubject } from "./settings.service";

export default function SubjectSetting() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getSubjects().then(setSubjects);
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    await addSubject(name);
    setName("");
    setSubjects(await getSubjects());
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">Kelola Mata Pelajaran</h3>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama mapel"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Tambah
        </button>
      </div>

      <ul className="text-sm space-y-1">
        {subjects.map((s) => (
          <li key={s.id}>• {s.name}</li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getClasses, addClass } from "./settings.service";

export default function ClassSetting() {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    await addClass(name);
    setName("");
    setClasses(await getClasses());
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">Kelola Kelas</h3>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kelas"
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
        {classes.map((c) => (
          <li key={c.id}>• {c.name}</li>
        ))}
      </ul>
    </div>
  );
}

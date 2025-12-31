"use client";

import { useEffect, useState } from "react";
import { getAddresses, addAddress } from "./settings.service";

export default function AddressSetting() {
  const [addresses, setAddresses] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getAddresses().then(setAddresses);
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    await addAddress(name);
    setName("");
    setAddresses(await getAddresses());
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-semibold">Kelola Alamat</h3>

      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama alamat"
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
        {addresses.map((a) => (
          <li key={a.id}>• {a.name}</li>
        ))}
      </ul>
    </div>
  );
}

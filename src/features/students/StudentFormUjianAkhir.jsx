"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { insertStudentUjianAkhir } from "./student.service";

export default function StudentFormUjianAkhir({ onSuccess }) {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");
  const [addressId, setAddressId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !classId || !addressId) return;

    try {
      await insertStudentUjianAkhir({
        name,
        class_id: Number(classId),
        address_id: Number(addressId),
      });
      setName("");
      setClassId("");
      setAddressId("");
      onSuccess?.();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Nama Santri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="ID Kelas"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <Input
        placeholder="ID Alamat"
        value={addressId}
        onChange={(e) => setAddressId(e.target.value)}
      />
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Tambah Santri Ujian Akhir
      </Button>
    </form>
  );
}

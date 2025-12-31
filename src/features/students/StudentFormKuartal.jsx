"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { insertStudentKuartal } from "./student.service";

export default function StudentFormKuartal({ onSuccess }) {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !classId) return;

    try {
      await insertStudentKuartal({
        name,
        class_id: Number(classId),
      });
      setName("");
      setClassId("");
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
        placeholder="ID Kelas (contoh: 1)"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
      />
      <Button type="submit">Tambah Santri Kuartal</Button>
    </form>
  );
}

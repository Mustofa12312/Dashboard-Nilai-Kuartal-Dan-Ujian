"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function StudentForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !kelas) return;

    onSubmit?.({ name, class: kelas });

    setName("");
    setKelas("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Nama santri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Kelas"
        value={kelas}
        onChange={(e) => setKelas(e.target.value)}
      />

      <Button type="submit">Tambah Santri</Button>
    </form>
  );
}

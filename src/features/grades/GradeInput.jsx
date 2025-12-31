"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function GradeInput({ onSubmit }) {
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student || !subject || !value) return;

    onSubmit?.({
      student,
      subject,
      value: Number(value),
    });

    setStudent("");
    setSubject("");
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Nama Santri"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />
      <Input
        placeholder="Mata Pelajaran"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Nilai"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button type="submit">Simpan Nilai</Button>
    </form>
  );
}

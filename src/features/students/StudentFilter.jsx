"use client";

import { Input } from "../../components/ui/input";

export default function StudentFilter({ onChange }) {
  return (
    <Input
      placeholder="Cari santri..."
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

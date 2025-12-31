"use client";

import { useEffect, useState } from "react";
import { getReportData } from "./report.service";

export default function ExportPreview({ type, classId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReportData({ type, classId }).then(setData);
  }, [type, classId]);

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">Tidak ada data untuk ditampilkan</p>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nama</th>
            <th className="p-2 text-left">Kelas</th>
            <th className="p-2 text-left">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.classes?.name}</td>
              <td className="p-2">{s.grades?.length || 0} mapel</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-2">Preview 5 data pertama</p>
    </div>
  );
}

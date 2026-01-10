"use client";

import { useEffect, useState } from "react";
import {
  getPivotReportData,
  normalizePivotReportData,
} from "./report.service";

export default function ExportPreview({ type, classId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const raw = await getPivotReportData({ type, classId });
      const normalized = normalizePivotReportData(raw, type);
      setData(normalized);
    }

    load();
  }, [type, classId]);

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500">
        Tidak ada data untuk ditampilkan
      </p>
    );
  }

  // ambil header kolom (ID, Nama, Kelas, Mapel...)
  const headers = Object.keys(data[0]);

  return (
    <div className="bg-white border rounded-xl p-4 overflow-x-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="p-2 text-left font-semibold border-b"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.slice(0, 5).map((row, i) => (
            <tr key={i} className="border-t">
              {headers.map((h) => (
                <td key={h} className="p-2 border-b">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-400 mt-2">
        Preview 5 data pertama (sesuai hasil export)
      </p>
    </div>
  );
}

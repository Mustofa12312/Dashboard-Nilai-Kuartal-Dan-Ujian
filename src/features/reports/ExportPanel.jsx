"use client";

import {
  getPivotReportData,
  normalizePivotReportData,
  exportToCSV,
  exportToExcel,
} from "./report.service";

export default function ExportPanel({
  type,
  setType,
  classId,
  setClassId,
  classes,
}) {
  const handleExportPivot = async (format) => {
    const raw = await getPivotReportData({ type, classId });

    if (!raw.length) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    const data = normalizePivotReportData(raw, type);
    const filename = `laporan_${type}_${classId}`;

    if (format === "csv") {
      exportToCSV(data, filename);
    } else {
      await exportToExcel(data, filename);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* JENIS NILAI */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="kuartal">Nilai Kuartal</option>
          <option value="ujian">Ujian Akhir</option>
        </select>

        {/* KELAS */}
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">Semua Kelas</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

        {/* EXPORT CSV */}
        <button
          onClick={() => handleExportPivot("csv")}
          className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        >
          Export CSV
        </button>

        {/* EXPORT EXCEL */}
        <button
          onClick={() => handleExportPivot("excel")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Export Excel
        </button>
      </div>
    </div>
  );
}

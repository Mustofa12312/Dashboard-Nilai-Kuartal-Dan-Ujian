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
  classes = [],
}) {
  /* ===============================
     EXPORT NORMAL (SATU FILE)
  =============================== */
  const handleExportPivot = async (format) => {
    try {
      const raw = await getPivotReportData({ type, classId });

      if (!raw || raw.length === 0) {
        alert("Tidak ada data untuk diexport");
        return;
      }

      const data = normalizePivotReportData(raw, type);

      if (!data || data.length === 0) {
        alert("Data hasil normalisasi kosong");
        return;
      }

      const filename =
        classId === "all"
          ? `laporan_${type}_semua_kelas`
          : `laporan_${type}_kelas_${classId}`;

      if (format === "csv") {
        exportToCSV(data, filename);
      } else {
        await exportToExcel(data, filename);
      }
    } catch (err) {
      console.error("Export error:", err);
      alert("Terjadi kesalahan saat export laporan");
    }
  };

  /* ===============================
     EXPORT PER KELAS OTOMATIS (BATCH)
     - 1 kelas = 1 file
  =============================== */
  const handleExportAllClasses = async (format) => {
    try {
      if (!classes.length) {
        alert("Data kelas kosong");
        return;
      }

      for (const cls of classes) {
        const raw = await getPivotReportData({
          type,
          classId: cls.id,
        });

        if (!raw || raw.length === 0) continue;

        const data = normalizePivotReportData(raw, type);
        if (!data || data.length === 0) continue;

        const filename = `laporan_${type}_kelas_${cls.name}`;

        if (format === "csv") {
          exportToCSV(data, filename);
        } else {
          await exportToExcel(data, filename);
        }
      }
    } catch (err) {
      console.error("Batch export error:", err);
      alert("Terjadi kesalahan saat export semua kelas");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

        {/* EXPORT CSV (NORMAL) */}
        <button
          onClick={() => handleExportPivot("csv")}
          className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        >
          Export CSV
        </button>

        {/* EXPORT EXCEL (NORMAL) */}
        <button
          onClick={() => handleExportPivot("excel")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Export Excel
        </button>

        {/* EXPORT SEMUA KELAS (BATCH) */}
        <button
          onClick={() => handleExportAllClasses("excel")}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded px-4 py-2"
        >
          Export Semua Kelas
        </button>
      </div>
    </div>
  );
}

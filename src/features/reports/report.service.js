import { supabase } from "../../lib/supabaseClient";
import Papa from "papaparse";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/* ======================================================
   AMBIL DATA LAPORAN (NON-PIVOT / UMUM)
====================================================== */
export async function getReportData({ type, classId }) {
  const isKuartal = type === "kuartal";

  const studentTable = isKuartal
    ? "students_kuartal"
    : "students_ujian_akhir";

  const gradeTable = isKuartal
    ? "grades_kuartal"
    : "grades_ujian_akhir";

  const query = supabase.from(studentTable).select(`
    id,
    name,
    class_id,
    classes ( id, name ),
    ${isKuartal ? "" : "addresses ( id, name ),"}
    grades:${gradeTable} (
      grade,
      created_at,
      subjects ( name )
    )
  `);

  if (classId && classId !== "all") {
    query.eq("class_id", classId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getReportData:", error.message);
    return [];
  }

  return data ?? [];
}

/* ======================================================
   NORMALISASI LAPORAN UMUM
====================================================== */
export function normalizeReportData(rawData = []) {
  return rawData.map((s) => ({
    ID: s.id,
    Nama: s.name,
    Kelas: s.classes?.name || "-",
    Alamat: s.addresses?.name || "-",
    "Jumlah Mapel": Array.isArray(s.grades) ? s.grades.length : 0,
  }));
}

/* ======================================================
   AMBIL DATA LAPORAN PIVOT MAPEL
====================================================== */
export async function getPivotReportData({ type, classId }) {
  const isKuartal = type === "kuartal";

  const studentTable = isKuartal
    ? "students_kuartal"
    : "students_ujian_akhir";

  const gradeTable = isKuartal
    ? "grades_kuartal"
    : "grades_ujian_akhir";

  const query = supabase.from(studentTable).select(`
    id,
    name,
    class_id,
    classes ( name ),
    ${isKuartal ? "" : "addresses ( name ),"}
    grades:${gradeTable} (
      grade,
      created_at,
      subjects ( name )
    )
  `);

  if (classId && classId !== "all") {
    query.eq("class_id", classId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getPivotReportData:", error.message);
    return [];
  }

  return data ?? [];
}

/* ======================================================
   NORMALISASI → FORMAT CSV / EXCEL (PIVOT MAPEL)
   - Nilai ganda → ambil TERAKHIR
   - Nilai kosong → 0
   - Mapel tidak pernah ada → tidak dimasukkan
====================================================== */
export function normalizePivotReportData(raw = [], type) {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  /* 1. Kumpulkan semua mapel yang benar-benar ADA */
  const mapelSet = new Set();

  raw.forEach((s) => {
    s.grades?.forEach((g) => {
      if (g.subjects?.name) {
        mapelSet.add(g.subjects.name);
      }
    });
  });

  const mapelList = Array.from(mapelSet);
  if (mapelList.length === 0) return [];

  /* 2. Bangun pivot per santri */
  return raw.map((s) => {
    const row = {
      ID: s.id,
      Nama: s.name,
      Kelas: s.classes?.name || "-",
    };

    if (type === "ujian") {
      row.Alamat = s.addresses?.name || "-";
    }

    /* default semua mapel = 0 */
    mapelList.forEach((mapel) => {
      row[mapel] = 0;
    });

    /* 3. Kelompokkan nilai per mapel */
    const nilaiPerMapel = {};

    s.grades?.forEach((g) => {
      const mapel = g.subjects?.name;
      if (!mapel) return;

      if (!nilaiPerMapel[mapel]) {
        nilaiPerMapel[mapel] = [];
      }

      nilaiPerMapel[mapel].push({
        grade: Number(g.grade) || 0,
        created_at: g.created_at,
      });
    });

    /* 4. Ambil nilai TERAKHIR */
    Object.entries(nilaiPerMapel).forEach(([mapel, values]) => {
      values.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      row[mapel] = values[0].grade;
    });

    return row;
  });
}

/* ======================================================
   EXPORT CSV
====================================================== */
export function exportToCSV(data, filename) {
  if (!Array.isArray(data) || data.length === 0) {
    alert("Data kosong, tidak bisa export");
    return;
  }

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `${filename}.csv`);
}

/* ======================================================
   EXPORT EXCEL
====================================================== */
export async function exportToExcel(data, filename) {
  if (!Array.isArray(data) || data.length === 0) {
    alert("Data kosong, tidak bisa export");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan");

  worksheet.columns = Object.keys(data[0]).map((key) => ({
    header: key,
    key,
    width: 20,
  }));

  data.forEach((row) => worksheet.addRow(row));

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${filename}.xlsx`);
}

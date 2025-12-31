import { supabase } from "../../lib/supabaseClient";
import Papa from "papaparse";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/* ======================================================
   AMBIL DATA LAPORAN (NON-PIVOT / UMUM)
====================================================== */
export async function getReportData({ type, classId }) {
  const isKuartal = type === "kuartal";

  const studentTable = isKuartal ? "students_kuartal" : "students_ujian_akhir";

  const gradeTable = isKuartal ? "grades_kuartal" : "grades_ujian_akhir";

  const query = supabase.from(studentTable).select(`
    id,
    name,
    class_id,
    classes ( id, name ),
    ${isKuartal ? "" : "addresses ( id, name ),"}
    grades:${gradeTable} (
      grade,
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

  return data || [];
}

/* ======================================================
   NORMALISASI LAPORAN UMUM
====================================================== */
export function normalizeReportData(rawData) {
  return rawData.map((s) => ({
    ID: s.id,
    Nama: s.name,
    Kelas: s.classes?.name || "-",
    Alamat: s.addresses?.name || "-",
    "Jumlah Mapel": s.grades?.length || 0,
  }));
}

/* ======================================================
   LAPORAN NILAI (PIVOT MAPEL)
   - Kuartal / Ujian Akhir
====================================================== */
export async function getPivotReportData({ type, classId }) {
  const isKuartal = type === "kuartal";

  const studentTable = isKuartal ? "students_kuartal" : "students_ujian_akhir";

  const gradeTable = isKuartal ? "grades_kuartal" : "grades_ujian_akhir";

  const query = supabase.from(studentTable).select(`
    id,
    name,
    class_id,
    classes ( name ),
    ${isKuartal ? "" : "addresses ( name ),"}
    grades:${gradeTable} (
      grade,
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

  return data || [];
}

/* ======================================================
   NORMALISASI → FORMAT CSV / EXCEL (PIVOT MAPEL)
====================================================== */
export function normalizePivotReportData(raw, type) {
  const mapelSet = new Set();

  // kumpulkan mapel yang BENAR-BENAR ADA
  raw.forEach((s) => {
    s.grades?.forEach((g) => {
      if (g.subjects?.name) {
        mapelSet.add(g.subjects.name);
      }
    });
  });

  const mapelList = Array.from(mapelSet);

  return raw.map((s) => {
    const row = {
      ID: s.id,
      Nama: s.name,
      Kelas: s.classes?.name || "-",
    };

    if (type === "ujian") {
      row.Alamat = s.addresses?.name || "-";
    }

    // isi nilai mapel (pivot)
    mapelList.forEach((mapel) => {
      const nilai = s.grades?.find((g) => g.subjects?.name === mapel);
      if (nilai) {
        row[mapel] = nilai.grade;
      }
    });

    return row;
  });
}

/* ======================================================
   EXPORT CSV (CLIENT ONLY)
====================================================== */
export function exportToCSV(data, filename) {
  if (!data || !data.length) return;

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, `${filename}.csv`);
}

/* ======================================================
   EXPORT EXCEL (CLIENT ONLY)
====================================================== */
export async function exportToExcel(data, filename) {
  if (!data || !data.length) return;

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
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${filename}.xlsx`);
}

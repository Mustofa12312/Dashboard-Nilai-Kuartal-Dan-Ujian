import Papa from "papaparse";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// ======================
// EXPORT CSV
// ======================
export function exportToCSV(data, filename) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(blob, `${filename}.csv`);
}

// ======================
// EXPORT EXCEL
// ======================
export async function exportToExcel(data, filename) {
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

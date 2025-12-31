import { supabase } from "../../lib/supabaseClient";

// ==========================
// SANTRI KUARTAL + KELAS
// ==========================
export async function getStudentsKuartal() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("students_kuartal")
    .select(`
      id,
      name,
      classes (
        id,
        name
      )
    `);

  if (error) {
    console.error("Kuartal:", error.message);
    return [];
  }

  return data || [];
}

// ==========================
// SANTRI UJIAN AKHIR + KELAS + ALAMAT
// ==========================
export async function getStudentsUjianAkhir() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("students_ujian_akhir")
    .select(`
      id,
      name,
      classes (
        id,
        name
      ),
      addresses (
        id,
        name
      )
    `);

  if (error) {
    console.error("Ujian Akhir:", error.message);
    return [];
  }

  return data || [];
}

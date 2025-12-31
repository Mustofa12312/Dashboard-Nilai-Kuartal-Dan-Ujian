import { supabase } from "../../lib/supabaseClient";

// ==========================
// NILAI KUARTAL
// ==========================
export async function getGradesKuartal() {
  if (!supabase) return [];

  const { data, error } = await supabase.from("grades_kuartal").select(`
      id,
      grade,
      students_kuartal (
        id,
        name
      ),
      subjects (
        id,
        name
      )
    `);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data || [];
}

// ==========================
// NILAI UJIAN AKHIR
// ==========================
export async function getGradesUjianAkhir() {
  if (!supabase) return [];

  const { data, error } = await supabase.from("grades_ujian_akhir").select(`
      id,
      grade,
      students_ujian_akhir (
        id,
        name
      ),
      subjects (
        id,
        name
      )
    `);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data || [];
}

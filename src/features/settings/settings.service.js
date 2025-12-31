import { supabase } from "../../lib/supabaseClient";

/* ===== KELAS ===== */
export async function getClasses() {
  const { data } = await supabase.from("classes").select("*");
  return data || [];
}

export async function addClass(name) {
  return supabase.from("classes").insert([{ name }]);
}

/* ===== MAPEL ===== */
export async function getSubjects() {
  const { data } = await supabase.from("subjects").select("*");
  return data || [];
}

export async function addSubject(name) {
  return supabase.from("subjects").insert([{ name }]);
}

/* ===== ALAMAT ===== */
export async function getAddresses() {
  const { data } = await supabase.from("addresses").select("*");
  return data || [];
}

export async function addAddress(name) {
  return supabase.from("addresses").insert([{ name }]);
}

import { supabase } from "../../lib/supabaseClient";

export async function login({ email, password }) {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function logout() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

import { supabase } from "../../../lib/supabaseClient";
import ReportsClient from "./ReportsClient";

export default async function ReportsPage() {
  const { data: classes } = await supabase.from("classes").select("id, name");

  return <ReportsClient classes={classes || []} />;
}

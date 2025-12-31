import { supabase } from "../../lib/supabaseClient";

/* ======================================================
   DASHBOARD STAT CARD
====================================================== */
export async function getDashboardStats() {
  if (!supabase) {
    return {
      students: 0,
      classes: 0,
      subjects: 0,
      average: 0,
    };
  }

  const { count: kuartalCount } = await supabase
    .from("students_kuartal")
    .select("*", { count: "exact", head: true });

  const { count: ujianCount } = await supabase
    .from("students_ujian_akhir")
    .select("*", { count: "exact", head: true });

  const { count: classes } = await supabase
    .from("classes")
    .select("*", { count: "exact", head: true });

  const { count: subjects } = await supabase
    .from("subjects")
    .select("*", { count: "exact", head: true });

  const { data: gradesK } = await supabase
    .from("grades_kuartal")
    .select("grade");

  const { data: gradesU } = await supabase
    .from("grades_ujian_akhir")
    .select("grade");

  const allGrades = [...(gradesK || []), ...(gradesU || [])];

  const average =
    allGrades.length > 0
      ? Math.round(
          allGrades.reduce((sum, g) => sum + Number(g.grade || 0), 0) /
            allGrades.length
        )
      : 0;

  return {
    students: (kuartalCount || 0) + (ujianCount || 0),
    classes: classes || 0,
    subjects: subjects || 0,
    average,
  };
}

/* ======================================================
   GRAFIK RATA-RATA KUARTAL vs UJIAN
====================================================== */
export async function getAverageChartData() {
  if (!supabase) {
    return [
      { label: "Kuartal", value: 0 },
      { label: "Ujian Akhir", value: 0 },
    ];
  }

  const { data: kuartal } = await supabase
    .from("grades_kuartal")
    .select("grade");

  const { data: ujian } = await supabase
    .from("grades_ujian_akhir")
    .select("grade");

  const avg = (rows) =>
    rows && rows.length
      ? Math.round(
          rows.reduce((sum, r) => sum + Number(r.grade || 0), 0) / rows.length
        )
      : 0;

  return [
    { label: "Kuartal", value: avg(kuartal) },
    { label: "Ujian Akhir", value: avg(ujian) },
  ];
}

/* ======================================================
   GRAFIK RATA-RATA PER MATA PELAJARAN
====================================================== */
export async function getSubjectChartData() {
  if (!supabase) return [];

  const { data: subjects } = await supabase.from("subjects").select("id, name");

  if (!subjects || subjects.length === 0) return [];

  const { data: gradesK } = await supabase
    .from("grades_kuartal")
    .select("grade, subject_id");

  const { data: gradesU } = await supabase
    .from("grades_ujian_akhir")
    .select("grade, subject_id");

  const allGrades = [...(gradesK || []), ...(gradesU || [])];

  return subjects.map((subj) => {
    const related = allGrades.filter((g) => g.subject_id === subj.id);

    const avg =
      related.length > 0
        ? Math.round(
            related.reduce((sum, r) => sum + Number(r.grade || 0), 0) /
              related.length
          )
        : 0;

    return {
      label: subj.name,
      value: avg,
    };
  });
}

/* ======================================================
   GRAFIK PER KELAS + PROGRESS & DETAIL SANTRI (HARI INI)
====================================================== */
export async function getClassChartData() {
  if (!supabase) return [];

  const today = new Date().toISOString().split("T")[0];

  const { data: classes } = await supabase.from("classes").select("id, name");

  if (!classes || classes.length === 0) return [];

  const { data: studentsK } = await supabase
    .from("students_kuartal")
    .select("id, name, class_id");

  const { data: studentsU } = await supabase
    .from("students_ujian_akhir")
    .select("id, name, class_id");

  const { data: gradesKToday } = await supabase
    .from("grades_kuartal")
    .select("student_id, grade")
    .gte("created_at", today);

  const { data: gradesUToday } = await supabase
    .from("grades_ujian_akhir")
    .select("student_id, grade")
    .gte("created_at", today);

  return classes.map((cls) => {
    const santriK = (studentsK || []).filter((s) => s.class_id === cls.id);
    const santriU = (studentsU || []).filter((s) => s.class_id === cls.id);

    const totalSantri = santriK.length + santriU.length;

    const nilaiK = (gradesKToday || []).filter((g) =>
      santriK.some((s) => s.id === g.student_id)
    );

    const nilaiU = (gradesUToday || []).filter((g) =>
      santriU.some((s) => s.id === g.student_id)
    );

    const allNilai = [...nilaiK, ...nilaiU];

    const avg = (rows) =>
      rows.length > 0
        ? Math.round(
            rows.reduce((sum, r) => sum + Number(r.grade || 0), 0) / rows.length
          )
        : 0;

    const average_kuartal = avg(nilaiK);
    const average_ujian = avg(nilaiU);
    const average = avg(allNilai);

    const dinilaiHariIni = new Set(allNilai.map((g) => g.student_id));

    const notRated = [
      ...santriK.filter((s) => !dinilaiHariIni.has(s.id)),
      ...santriU.filter((s) => !dinilaiHariIni.has(s.id)),
    ].map((s) => ({
      id: s.id,
      name: s.name,
    }));

    const progress =
      totalSantri > 0
        ? Math.round(((totalSantri - notRated.length) / totalSantri) * 100)
        : 0;

    return {
      class: cls.name,
      average,
      average_kuartal,
      average_ujian,
      progress,
      notRated,
    };
  });
}

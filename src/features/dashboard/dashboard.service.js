import { supabase } from "../../lib/supabaseClient";

/* ======================================================
   DASHBOARD STAT CARD (MONITOR KERJA GURU)
====================================================== */
export async function getDashboardStats() {
  if (!supabase) {
    return {
      students: 0,
      classes: 0,
      subjects: 0,
      average: 0,
      gradedToday: 0,
      notGradedToday: 0,
      progressToday: 0,
    };
  }

  const today = new Date().toISOString().split("T")[0];

  /* ================= TOTAL DASAR ================= */
  const [{ count: studentsK }, { count: studentsU }] = await Promise.all([
    supabase
      .from("students_kuartal")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("students_ujian_akhir")
      .select("*", { count: "exact", head: true }),
  ]);

  const [{ count: classes }, { count: subjects }] = await Promise.all([
    supabase.from("classes").select("*", { count: "exact", head: true }),
    supabase.from("subjects").select("*", { count: "exact", head: true }),
  ]);

  const totalStudents = (studentsK || 0) + (studentsU || 0);

  /* ================= RATA-RATA NILAI ================= */
  const [{ data: gradesK }, { data: gradesU }] = await Promise.all([
    supabase.from("grades_kuartal").select("grade"),
    supabase.from("grades_ujian_akhir").select("grade"),
  ]);

  const allGrades = [...(gradesK || []), ...(gradesU || [])];

  const average =
    allGrades.length > 0
      ? Math.round(
          allGrades.reduce((sum, g) => sum + Number(g.grade || 0), 0) /
            allGrades.length
        )
      : 0;

  /* ================= PROGRESS NILAI HARI INI ================= */
  const [{ data: gradedKToday }, { data: gradedUToday }] = await Promise.all([
    supabase
      .from("grades_kuartal")
      .select("student_id")
      .gte("created_at", today),
    supabase
      .from("grades_ujian_akhir")
      .select("student_id")
      .gte("created_at", today),
  ]);

  const gradedSet = new Set([
    ...(gradedKToday || []).map((g) => g.student_id),
    ...(gradedUToday || []).map((g) => g.student_id),
  ]);

  const gradedToday = gradedSet.size;
  const notGradedToday = Math.max(totalStudents - gradedToday, 0);

  const progressToday =
    totalStudents > 0
      ? Math.round((gradedToday / totalStudents) * 100)
      : 0;

  return {
    students: totalStudents,
    classes: classes || 0,
    subjects: subjects || 0,
    average,
    gradedToday,
    notGradedToday,
    progressToday,
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

  const [{ data: kuartal }, { data: ujian }] = await Promise.all([
    supabase.from("grades_kuartal").select("grade"),
    supabase.from("grades_ujian_akhir").select("grade"),
  ]);

  const avg = (rows = []) =>
    rows.length
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

  const [{ data: gradesK }, { data: gradesU }] = await Promise.all([
    supabase.from("grades_kuartal").select("grade, subject_id"),
    supabase.from("grades_ujian_akhir").select("grade, subject_id"),
  ]);

  const allGrades = [...(gradesK || []), ...(gradesU || [])];

  return subjects.map((subj) => {
    const related = allGrades.filter((g) => g.subject_id === subj.id);

    const avg =
      related.length > 0
        ? Math.round(
            related.reduce(
              (sum, r) => sum + Number(r.grade || 0),
              0
            ) / related.length
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

  const [{ data: studentsK }, { data: studentsU }] = await Promise.all([
    supabase.from("students_kuartal").select("id, name, class_id"),
    supabase.from("students_ujian_akhir").select("id, name, class_id"),
  ]);

  const [{ data: gradesKToday }, { data: gradesUToday }] = await Promise.all([
    supabase
      .from("grades_kuartal")
      .select("student_id, grade")
      .gte("created_at", today),
    supabase
      .from("grades_ujian_akhir")
      .select("student_id, grade")
      .gte("created_at", today),
  ]);

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

    const avg = (rows = []) =>
      rows.length
        ? Math.round(
            rows.reduce((sum, r) => sum + Number(r.grade || 0), 0) /
              rows.length
          )
        : 0;

    const dinilaiHariIni = new Set(allNilai.map((g) => g.student_id));

    const notRated = [
      ...santriK.filter((s) => !dinilaiHariIni.has(s.id)),
      ...santriU.filter((s) => !dinilaiHariIni.has(s.id)),
    ].map((s) => ({ id: s.id, name: s.name }));

    const progress =
      totalSantri > 0
        ? Math.round(((totalSantri - notRated.length) / totalSantri) * 100)
        : 0;

    return {
      class: cls.name,
      average: avg(allNilai),
      average_kuartal: avg(nilaiK),
      average_ujian: avg(nilaiU),
      progress,
      notRated,
    };
  });
}

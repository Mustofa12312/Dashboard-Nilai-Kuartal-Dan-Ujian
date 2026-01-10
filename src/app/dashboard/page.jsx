import StatCard from "../../features/dashboard/StatCard";
import Charts from "../../features/dashboard/Charts";
import ClassChart from "../../features/dashboard/ClassChart";

import {
  getDashboardStats,
  getAverageChartData,
  getSubjectChartData,
  getClassChartData,
} from "../../features/dashboard/dashboard.service";

export default async function DashboardPage() {
  // ================== STAT ==================
  const stats = await getDashboardStats();

  // ================== CHART DATA ==================
  const avgChart = await getAverageChartData();
  const subjectChart = await getSubjectChartData();
  const classChart = await getClassChartData();

  // ================== LOGIC WARNA PROGRESS ==================
  const progressColor =
    stats.progressToday >= 80
      ? "green"
      : stats.progressToday >= 50
      ? "yellow"
      : "red";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* ================= STAT CARD ================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Santri"
          value={stats.students}
          subtitle="Santri aktif"
        />

        <StatCard
          title="Total Kelas"
          value={stats.classes}
          subtitle="Kelas terdaftar"
        />

        <StatCard
          title="Mata Pelajaran"
          value={stats.subjects}
          subtitle="Mapel aktif"
        />

        <StatCard
          title="Rata-rata Nilai"
          value={stats.average}
          subtitle="Keseluruhan"
        />

        <StatCard
          title="Progress Nilai Hari Ini"
          value={`${stats.progressToday}%`}
          subtitle={`${stats.gradedToday} dinilai • ${stats.notGradedToday} belum`}
          progress={stats.progressToday}
          color={progressColor}
        />
      </div>

      {/* ================= GRAFIK UTAMA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Charts
          title="Rata-rata Nilai (Kuartal vs Ujian)"
          data={avgChart}
        />

        <Charts
          title="Rata-rata Nilai per Mata Pelajaran"
          data={subjectChart}
        />
      </div>

      {/* ================= GRAFIK PER KELAS + DETAIL ================= */}
      <ClassChart data={classChart} />
    </div>
  );
}

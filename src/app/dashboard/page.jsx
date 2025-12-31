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
  // STAT
  const stats = await getDashboardStats();

  // CHART DATA
  const avgChart = await getAverageChartData();
  const subjectChart = await getSubjectChartData();
  const classChart = await getClassChartData();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* STAT CARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Santri" value={stats.students} />
        <StatCard title="Total Kelas" value={stats.classes} />
        <StatCard title="Mata Pelajaran" value={stats.subjects} />
        <StatCard title="Rata-rata Nilai" value={stats.average} />
      </div>

      {/* GRAFIK UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Charts title="Rata-rata Nilai (Kuartal vs Ujian)" data={avgChart} />
        <Charts
          title="Rata-rata Nilai per Mata Pelajaran"
          data={subjectChart}
        />
      </div>

      {/* GRAFIK PER KELAS + PROGRESS */}
      <ClassChart data={classChart} />
    </div>
  );
}

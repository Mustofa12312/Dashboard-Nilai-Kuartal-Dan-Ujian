export default function GradeSummary({ average = 0 }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500">Rata-rata Nilai</p>
      <p className="text-2xl font-bold">{average}</p>
    </div>
  );
}

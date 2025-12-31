export default function EmptyState({
  title = "Data Kosong",
  description = "Belum ada data yang ditampilkan.",
}) {
  return (
    <div className="text-center py-16 text-gray-500">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

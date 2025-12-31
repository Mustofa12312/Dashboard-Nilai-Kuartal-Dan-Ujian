export default function Charts({ data = [], title = "Grafik Nilai" }) {
  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500">
          Belum ada data untuk ditampilkan
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-semibold mb-4">{title}</h3>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>

            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className="bg-green-600 h-3 rounded"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

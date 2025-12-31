import EmptyState from "../../components/common/EmptyState";

export default function StudentTable({ data = [], showAddress = false }) {
  if (!data.length) {
    return <EmptyState title="Data kosong" description="Belum ada santri." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left text-sm font-semibold">ID</th>
            <th className="p-2 text-left text-sm font-semibold">Nama</th>
            <th className="p-2 text-left text-sm font-semibold">Kelas</th>
            {showAddress && (
              <th className="p-2 text-left text-sm font-semibold">Alamat</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s.id} className="border-t hover:bg-gray-50 transition">
              {/* ID */}
              <td className="p-2 text-sm text-gray-600">{s.id}</td>

              {/* Nama */}
              <td className="p-2 font-medium">{s.name}</td>

              {/* Kelas (JOIN) */}
              <td className="p-2">{s.classes?.name || "-"}</td>

              {/* Alamat (JOIN, Ujian Akhir) */}
              {showAddress && (
                <td className="p-2">{s.addresses?.name || "-"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import EmptyState from "../../components/common/EmptyState";

export default function GradeTable({ data = [] }) {
  if (!data.length) {
    return (
      <EmptyState
        title="Belum ada nilai"
        description="Silakan input nilai terlebih dahulu."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Santri</th>
            <th className="p-2 text-left">Mapel</th>
            <th className="p-2 text-left">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((g) => (
            <tr key={g.id} className="border-t">
              <td className="p-2 text-sm">{g.id}</td>
              <td className="p-2">
                {g.students_kuartal?.name || g.students_ujian_akhir?.name}
              </td>
              <td className="p-2">{g.subjects?.name}</td>
              <td className="p-2 font-semibold">{g.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

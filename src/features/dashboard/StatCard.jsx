export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

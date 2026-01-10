export default function StatCard({
  title,
  value,
  icon,
  subtitle,     // teks kecil (opsional)
  progress,     // angka 0–100 (opsional)
  color = "blue", // blue | green | yellow | red
}) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  };

  const barColorMap = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-500",
    red: "bg-red-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              colorMap[color] || colorMap.blue
            }`}
          >
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>

          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {/* PROGRESS BAR (OPSIONAL) */}
      {typeof progress === "number" && (
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className={`h-2 rounded ${
              barColorMap[color] || barColorMap.blue
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

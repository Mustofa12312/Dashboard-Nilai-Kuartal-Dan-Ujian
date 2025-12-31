export default function Loader({ label = "Memuat..." }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-gray-600 text-sm">{label}</span>
      </div>
    </div>
  );
}

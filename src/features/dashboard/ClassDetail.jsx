"use client";

export default function ClassDetail({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Santri Belum Dinilai – {data.class}</h4>
          <button onClick={onClose} className="text-sm text-gray-500">
            Tutup
          </button>
        </div>

        {data.notRated?.length ? (
          <ul className="space-y-2 text-sm">
            {data.notRated.map((s) => (
              <li key={s.id} className="border rounded px-3 py-2">
                {s.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            Semua santri sudah dinilai hari ini ✅
          </p>
        )}
      </div>
    </div>
  );
}

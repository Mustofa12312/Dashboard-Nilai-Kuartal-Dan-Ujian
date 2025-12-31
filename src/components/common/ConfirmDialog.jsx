"use client";

import { Button } from "../ui/button";

export default function ConfirmDialog({
  open,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[320px] shadow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            Ya, Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}

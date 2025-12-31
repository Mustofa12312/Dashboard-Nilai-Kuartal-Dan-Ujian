"use client";

export function Dialog({ open, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">{children}</div>
    </div>
  );
}

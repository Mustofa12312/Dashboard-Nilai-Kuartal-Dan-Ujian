"use client";

import { useState } from "react";
import ExportPanel from "../../../features/reports/ExportPanel";
import ExportPreview from "../../../features/reports/ExportPreview";

export default function ReportsClient({ classes }) {
  const [type, setType] = useState("kuartal");
  const [classId, setClassId] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Laporan & Export</h2>
        <p className="text-sm text-gray-500">Export laporan nilai santri</p>
      </div>

      <ExportPanel
        type={type}
        setType={setType}
        classId={classId}
        setClassId={setClassId}
        classes={classes}
      />

      <ExportPreview type={type} classId={classId} />
    </div>
  );
}

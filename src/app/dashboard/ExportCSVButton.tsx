"use client";

import { Button } from "@/components/ui/button";
import { exportAllApplications } from "@/lib/exportCSV";
import { Application } from "@/types";
import { FileUp } from "lucide-react";
interface ExportCSVProps {
  applications: Application[];
}
export default function ExportCSVButton({ applications }: ExportCSVProps) {
  function handleExport() {
    exportAllApplications(applications);
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <FileUp className="mr-2 size-4" />
      Export CSV
    </Button>
  );
}

"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Application } from "@/types";
import { EditJobSheet } from "@/components/EditJobSheet";
import { DeleteJobDialog } from "@/components/DeleteJobDialog";

export function ApplicationsTable({
  applications,
}: {
  applications: Application[];
}) {
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [deleteApp, setDeleteApp] = useState<Application | null>(null);
  return (
    <>
      <DataTable
        columns={columns({ onEdit: setEditApp, onDelete: setDeleteApp })}
        data={applications}
        onRowClick={(app)=>setEditApp(app)}
      />
      {editApp && (
        <EditJobSheet
          application={editApp}
          open={!!editApp}
          onOpenChange={(open) => {
            if (!open) setEditApp(null);
          }}
        />
      )}
      {deleteApp && (
        <DeleteJobDialog
          application={deleteApp}
          open={!!deleteApp}
          onOpenChange={(open) => {
            if (!open) setDeleteApp(null);
          }}
        />
      )}
    </>
  );
}

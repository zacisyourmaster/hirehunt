"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Application, ApplicationWithReminders } from "@/types";
import { EditJobSheet } from "@/components/EditJobSheet";
import { DeleteJobDialog } from "@/components/DeleteJobDialog";

export function ApplicationsTable({
  applications,
}: {
  applications: ApplicationWithReminders[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteApp, setDeleteApp] = useState<Application | null>(null);

  const selectedId = searchParams.get("id");
  const editApp = applications.find((a) => a.id === selectedId) ?? null;

  const openApp = useCallback(
    (app: Application) => {
      router.push(`/dashboard?id=${app.id}`);
    },
    [router],
  );

  const closeApp = (open: boolean) => {
    if (!open) router.push("/dashboard");
  };
  const memoColumns = useMemo(
    () => columns({ onEdit: openApp, onDelete: setDeleteApp }),
    [openApp],
  );
  return (
    <>
      <DataTable
        columns={memoColumns}
        data={applications}
        onRowClick={openApp}
      />
      {editApp && (
        <EditJobSheet
          application={editApp}
          open={!!editApp}
          onOpenChange={closeApp}
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

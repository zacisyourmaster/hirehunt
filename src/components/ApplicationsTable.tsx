"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EditJobSheet } from "./EditJobSheet";
import { useState } from "react";
import { DeleteJobDialog } from "./DeleteJobDialog";
import { Badge } from "./ui/badge";
import { Application } from "@/types";
// interface Application {
//   id: string;
//   userId: string;
//   company: string;
//   position: string;
//   status: string;
//   notes: string | null;
//   salary: string | null;
//   location: string | null;
//   jobType: string | null;
//   appliedAt: Date;
//   followUpAt: Date | null;
//   createdAt: Date;
// }
interface ApplicationsTableProps {
  applications: Application[];
}
// const statusStyles: Record<string, string> = {
//   applied: "text-yellow-300 bg-yellow-950",
//   rejected: "text-red-300 bg-red-950",
//   ghosted: "text-gray-300 bg-gray-950",
//   interview: "text-cyan-300 bg-cyan-950",
//   offer: "text-green-300 bg-green-950",
// };

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [deleteApp, setDeleteApp] = useState<Application | null>(null);

  return (
    <div className="overflow-hidden border rounded-md">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.company}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell className="capitalize">
                <Badge>{app.status.toLowerCase()}</Badge>
              </TableCell>
              <TableCell>{app.appliedAt.toISOString().slice(0, 10)}</TableCell>
              <TableCell className="text-right">
                {
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() => {
                          setEditApp(app);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => {
                          setDeleteApp(app);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
  );
}

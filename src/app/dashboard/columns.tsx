"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Application, statusStyles } from "@/types";
// export type Application = {
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
// };

// const statusStyles: Record<string, string> = {
//   applied: "text-yellow-300 bg-yellow-950",
//   rejected: "text-red-300 bg-red-950",
//   ghosted: "text-gray-300 bg-gray-950",
//   interview: "text-cyan-300 bg-cyan-950",
//   offer: "text-green-300 bg-green-950",
// };

interface ColumnsProps {
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Application>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 10,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "appliedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applied <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue<Date>("appliedAt");

      return (
        <span className="text-muted-foreground">
          {date ? new Date(date).toLocaleDateString() : "-"}
        </span>
      );
    },
    size: 40,
  },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "position", header: "Position" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status").toLowerCase();
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize",
            `${status}`,
            statusStyles[status] ?? "text-gray-300 bg-gray-950",
          )}
        >
          {status}
        </Badge>
      );
    },
    size: 15,
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const app = row.original;

      return (
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
                onEdit(app);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => {
                onDelete(app);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 10,
    enableGlobalFilter: false,
  },
];

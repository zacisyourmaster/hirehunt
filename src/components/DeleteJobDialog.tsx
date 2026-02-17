"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useTransition } from "react";
import { Trash2Icon } from "lucide-react";
import { deleteApplication } from "@/actions/actions";

interface Application {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: string;
  notes: string | null;
  salary: string | null;
  location: string | null;
  jobType: string | null;
  appliedAt: Date;
  followUpAt: Date | null;
  createdAt: Date;
}

interface Props {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteJobDialog({ application, open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteApplication(application.id);
      onOpenChange(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete application?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your application to{" "}
            <strong>{application.company}</strong>. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

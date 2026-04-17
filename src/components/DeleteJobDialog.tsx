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
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTransition } from "react";
import { Trash2Icon } from "lucide-react";
import { deleteApplication } from "@/actions/actions";
import { Application, ApplicationWithReminders } from "@/types";
import { Button } from "./ui/button";

interface Props {
  application: Application | ApplicationWithReminders;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteJobDialog({ application, open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteApplication(application.id);
      if (onOpenChange) onOpenChange(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-700 px-0">
          Delete
        </Button>
      </AlertDialogTrigger>
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

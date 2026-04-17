"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import {
  completeReminder,
  deleteReminder,
  updateApplicationForm,
} from "@/actions/actions";
import { ApplicationWithReminders } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { AddReminder } from "./AddReminder";
import { useRouter } from "next/navigation";

const statusOptions = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Ghosted",
];

const jobTypeOptions = ["Full-Time", "Part-Time", "Internship"];

const formatDateForInput = (date: Date | null) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

interface EditJobSheetProps {
  application: ApplicationWithReminders;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditJobSheet({
  application,
  open,
  onOpenChange,
}: EditJobSheetProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | undefined>(application.status);
  const [jobType, setJobType] = useState<string | undefined>(
    application.jobType ?? undefined,
  );
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateApplicationForm(formData);
      onOpenChange?.(false);
    });
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="px-0">Edit</Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-2xl w-screen h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Application</SheetTitle>
          <SheetDescription>
            Make changes to your job application for {application.company}.
          </SheetDescription>

          {!isEditing && (
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </SheetHeader>

        {/* ===================== APPLICATION FORM ===================== */}
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={application.id} />

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                defaultValue={application.company}
                disabled={!isEditing}
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                name="position"
                defaultValue={application.position}
                disabled={!isEditing}
              />
            </div>

            {/* Location & Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  defaultValue={application.location || ""}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Salary</Label>
                <Input
                  name="salary"
                  defaultValue={application.salary || ""}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Status & Job Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s.toUpperCase()}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="status" value={status} />
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={jobType}
                  onValueChange={setJobType}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypeOptions.map((type) => (
                      <SelectItem
                        key={type}
                        value={type.toUpperCase().replace("-", "_")}
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="jobType" value={jobType ?? ""} />
              </div>
            </div>

            {/* Applied Date */}
            <div className="space-y-2">
              <Label>Applied Date</Label>
              <Input
                type="date"
                name="appliedAt"
                defaultValue={formatDateForInput(application.appliedAt)}
                disabled={!isEditing}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                name="notes"
                defaultValue={application.notes || ""}
                disabled={!isEditing}
              />
            </div>
          </div>

          <SheetFooter className="border-t">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>

        {/* ===================== REMINDERS SECTION ===================== */}
        <div className="px-4 mt-6 space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reminders</h3>
            <AddReminder applicationId={application.id} />
          </div>

          {application.reminders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reminders yet</p>
          ) : (
            <ScrollArea className="h-96 min-w-fit">
              <div className="space-y-4 p-4">
                {application.reminders.map((reminder) => {
                  const isOverdue =
                    new Date(reminder.dueDate) < new Date() &&
                    !reminder.completed;

                  return (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between rounded-lg border p-3 bg-card ${
                        isOverdue ? "border-red-500" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {reminder.type.toLowerCase().replace("_", "-")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due {formatDateForInput(reminder.dueDate)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <form
                          action={completeReminder}
                          onSubmit={() => router.refresh()}
                        >
                          <input type="hidden" name="id" value={reminder.id} />

                          <Button type="submit" size="sm" variant="secondary">
                            ✓
                          </Button>
                        </form>
                        <form
                          action={deleteReminder}
                          onSubmit={() => router.refresh()}
                        >
                          <input type="hidden" name="id" value={reminder.id} />

                          <Button type="submit" size="sm" variant="destructive">
                            Delete
                          </Button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

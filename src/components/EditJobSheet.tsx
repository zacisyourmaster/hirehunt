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
import { useState, useTransition } from "react";
import { updateApplicationForm } from "@/actions/actions";

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

interface EditJobSheetProps {
  application: Application;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const statusOptions = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
  "Withdrawn",
  "Ghosted",
];

const jobTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
  "Hybrid",
  "On-site",
];

export function EditJobSheet({
  application,
  open,
  onOpenChange,
}: EditJobSheetProps) {
  // Format dates for input fields
  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  //   const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState(application.status);
  const [jobType, setJobType] = useState(application.jobType || "");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await updateApplicationForm(formData);
      onOpenChange?.(false);
    });
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* <SheetTrigger asChild>
        <span
          className="w-full cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Edit
        </span>
      </SheetTrigger> */}
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Application</SheetTitle>
          <SheetDescription>
            Make changes to your job application for {application.company}.
          </SheetDescription>
        </SheetHeader>
        <form action={handleSubmit}>
          <input type="hidden" name="id" value={application.id} />
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* Company & Position */}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="space-y-2">
              <Label htmlFor="company">
                Company <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                defaultValue={application.company}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">
                Position <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                defaultValue={application.position}
                required
              />
            </div>
            {/* </div> */}

            {/* Location & Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={application.location || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  defaultValue={application.salary || ""}
                />
              </div>
            </div>

            {/* Status & Job Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={application.status}
                  onValueChange={setStatus}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <input type="hidden" name="status" value={status} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select
                  defaultValue={application.jobType || ""}
                  onValueChange={setJobType}
                >
                  <SelectTrigger id="jobType" className="w-full">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="jobType" value={jobType} />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appliedAt">Applied Date</Label>
                <Input
                  id="appliedAt"
                  name="appliedAt"
                  type="date"
                  defaultValue={formatDateForInput(application.appliedAt)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followUpAt">Follow-up Date</Label>
                <Input
                  id="followUpAt"
                  name="followUpAt"
                  type="date"
                  defaultValue={formatDateForInput(application.followUpAt)}
                />
                <p className="text-xs text-muted-foreground">
                  Optional - when to follow up
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={application.notes || ""}
                className="min-h-25"
              />
            </div>
          </div>

          <SheetFooter className="border-t ">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

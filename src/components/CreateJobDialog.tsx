"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

function parseMMDDYYYY(value: string): Date | undefined {
  const parts = value.split("/");
  if (parts.length !== 3) return undefined;

  const [month, day, year] = parts.map(Number);

  if (!month || !day || !year) return undefined;

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
}

export default function CreateJobDialog() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "applied",
    jobType: "full_time",
    notes: "",
    appliedAt: new Date().toISOString().split("T")[0],
  });
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(formData.appliedAt),
  );
  const [inputValue, setInputValue] = useState(
    selectedDate ? selectedDate.toLocaleDateString("en-US") : "",
  );
  const [month, setMonth] = useState<Date | undefined>(selectedDate);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      company: formData.company.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      salary: formData.salary.trim(),
      notes: formData.notes.trim(),
      status: formData.status.toUpperCase(),
      jobType: formData.jobType.toUpperCase(),
    };

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    await response.json();

    toast.success("Job has been added");

    setFormData({
      company: "",
      position: "",
      location: "",
      salary: "",
      status: "applied",
      jobType: "fullTime",
      notes: "",
      appliedAt: new Date().toISOString().split("T")[0],
    });

    setOpen(false);
    router.refresh();
    try {
    } catch (err) {
      console.error(`Error: ${err}`);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>
            <Plus />
            Add Job
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Job Application</DialogTitle>
            <DialogDescription>Track a new job application</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    required
                    value={formData.position}
                    onChange={(e) => {
                      setFormData({ ...formData, position: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    placeholder="e.g, $100k - $150k"
                    value={formData.salary}
                    onChange={(e) => {
                      setFormData({ ...formData, salary: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    required
                    value={formData.status}
                    onValueChange={(value) => {
                      setFormData({ ...formData, status: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status *</SelectLabel>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="ghosted">Ghosted</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) => {
                      setFormData({ ...formData, jobType: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Job Type</SelectLabel>
                        <SelectItem value="full_time">Full-Time</SelectItem>
                        <SelectItem value="part_time">Part-Time</SelectItem>
                        <SelectItem value="internship">
                          Internship/Co-op
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => {
                    setFormData({ ...formData, notes: e.target.value });
                  }}
                />
              </div>
              <div className="space-y-2 max-w-32">
                <Label htmlFor="applied-at">Applied Date *</Label>

                <InputGroup>
                  <InputGroupInput
                    id="applied-at"
                    placeholder="MM/DD/YYYY"
                    value={inputValue}
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      setInputValue(value);

                      const parsed = parseMMDDYYYY(value);

                      if (parsed) {
                        setSelectedDate(parsed);
                        setMonth(parsed);
                        setFormData({
                          ...formData,
                          appliedAt: parsed.toISOString().split("T")[0],
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setDateOpen(true);
                      }
                    }}
                  />

                  <InputGroupAddon align="inline-end">
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                        </InputGroupButton>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        sideOffset={8}
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            if (!date) return;

                            setSelectedDate(date);
                            setMonth(date);

                            const formatted = date.toLocaleDateString("en-US");

                            setInputValue(formatted);

                            setFormData({
                              ...formData,
                              appliedAt: date.toISOString().split("T")[0],
                            });

                            setDateOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}

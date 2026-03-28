import { createReminder } from "@/actions/actions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function AddReminder({ applicationId }: { applicationId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">+ Add Reminder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-popover">
        <DialogHeader>
          <DialogTitle>Add Reminder</DialogTitle>
          <DialogDescription>
            Set an email reminder for this application.
          </DialogDescription>
        </DialogHeader>
        <form action={createReminder}>
          <input type="hidden" name="applicationId" value={applicationId} />
          <FieldGroup className="mb-4">
            <Field>
              <Label htmlFor="type">
                Reminder Type<span className="text-red-700 ml-0.5">*</span>
              </Label>

              <Select
                onValueChange={(value) => {
                  const input = document.getElementById(
                    "type-input",
                  ) as HTMLInputElement;
                  if (input) input.value = value;
                }}
                required
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="FOLLOW_UP">Follow-Up</SelectItem>
                    <SelectItem value="INTERVIEW">Interview</SelectItem>
                    <SelectItem value="DEADLINE">Deadline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <input id="type-input" name="type" type="hidden" />
            </Field>

            <Field>
              <Label htmlFor="dueDate">
                Due Date<span className="text-red-700 ml-0.5">*</span>
              </Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                className="max-w-48"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="notes">
                Notes <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Hiring Manager is Sarah Johnson"
                className="resize-none"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

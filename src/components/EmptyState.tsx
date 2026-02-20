import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import CreateJobDialog from "./CreateJobDialog";
export default function EmptyState() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyTitle>No Applications Yet!</EmptyTitle>
        <EmptyDescription>
          You need to add some applications to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <CreateJobDialog />
        <Button variant="outline" disabled>Import from CSV</Button>
      </EmptyContent>
    </Empty>
  );
}

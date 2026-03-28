import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import CreateJobDialog from "./CreateJobDialog";
import { ImportCSVDialog } from "./ImportCSVDialog";
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
        <ImportCSVDialog />    
      </EmptyContent>
    </Empty>
  );
}

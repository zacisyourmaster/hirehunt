import { Card } from "./ui/card";

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 min-w-full min-h-60 font-bold">
      <Card className="@container/card text-2xl text-center">Stats</Card>
      <Card className="@container/card text-2xl text-center">Are</Card>
      <Card className="@container/card text-2xl text-center">Coming</Card>
      <Card className="@container/card text-2xl text-center">Soon</Card>
    </div>
  );
}

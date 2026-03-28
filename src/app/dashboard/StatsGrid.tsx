import { StatCard } from "@/components/StatCard";
import { BarChart3, Clock, FileText, Users } from "lucide-react";
interface StatsGridProps {
  stats: {
    total: number;
    applied: number;
    interview: number;
    responseRate: number;
  };
}
export function StatsGrid({ stats }: StatsGridProps) {
  const statCardData = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <FileText />,
      iconBgClass: "bg-blue-950",
      iconTextClass: "text-blue-300",
    },
    {
      title: "Pending",
      value: stats.applied,
      icon: <Clock />,
      iconBgClass: "bg-yellow-950",
      iconTextClass: "text-yellow-300",
    },
    {
      title: "Interviews",
      value: stats.interview,
      icon: <Users />,
      iconBgClass: "bg-green-950",
      iconTextClass: "text-green-300",
    },
    {
      title: "Response Rate",
      value: `${stats.responseRate}%`,
      icon: <BarChart3 />,
      iconBgClass: "bg-purple-950",
      iconTextClass: "text-purple-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statCardData.map((data) => (
        <StatCard key={data.title} {...data} />
      ))}
    </div>
  );
}

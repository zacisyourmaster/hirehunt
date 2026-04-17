"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationsTable } from "./app-table";
import { ApplicationCard } from "@/components/ApplicationCard";
import { ApplicationWithReminders } from "@/types";

export function ApplicationTabs({
  applications,
}: {
  applications: ApplicationWithReminders[];
}) {
  const [activeTab, setActiveTab] = useState("data-table");

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="data-table">Table</TabsTrigger>
          <TabsTrigger value="cards">List</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Both always rendered, CSS hides the inactive one */}
      <div style={{ display: activeTab === "data-table" ? "block" : "none" }}>
        <ApplicationsTable applications={applications} />
      </div>

      <div style={{ display: activeTab === "cards" ? "block" : "none" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      </div>
    </>
  );
}

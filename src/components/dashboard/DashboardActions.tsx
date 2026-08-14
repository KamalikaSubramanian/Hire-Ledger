"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Search,
  FileText,
  History,
} from "lucide-react";

export default function DashboardActions() {
  const router = useRouter();

  return (
    <div className="dashboard-actions">
      <Button
        variant="outline"
        className="dashboard-action-button"
        onClick={() => router.push("/analyze")}
      >
        <Search />
        <span>Analyze Resume</span>
      </Button>

      <Button
        variant="outline"
        className="dashboard-action-button"
        onClick={() => router.push("/resume-library")}
      >
        <FileText />
        <span>Resume Library</span>
      </Button>

      <Button
        variant="outline"
        className="dashboard-action-button"
        onClick={() => router.push("/analysisHistory")}
      >
        <History />
        <span>Analysis History</span>
      </Button>
    </div>
  );
}
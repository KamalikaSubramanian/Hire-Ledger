"use client";

import { Resume } from "@/types/resume";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Eye, CheckCircle2, FileText } from "lucide-react";

import { useRouter } from "next/navigation";

interface ResumeSelectionCardProps {
  resume: Resume;

  selected: boolean;

  onSelect: () => void;
}

export default function ResumeSelectionCard({
  resume,
  selected,
  onSelect,
}: ResumeSelectionCardProps) {
  const router = useRouter();

  return (
    <Card
  className={`resume-selection-card cursor-pointer transition ${
    selected ? "border-primary border-2" : ""
  }`}
  onClick={onSelect}
>
  <CardContent className="resume-selection-card-content">
    <div className="resume-selection-info">
      <FileText className="resume-selection-icon text-primary" />

      <div className="resume-selection-details">
        <h3 className="resume-selection-name">
          {resume.fileName}
        </h3>

        <p className="resume-selection-date text-muted-foreground">
          Uploaded{" "}
          {new Date(resume.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>

    <div className="resume-selection-actions">
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();

          router.push(`/resume-library/view/${resume._id}`);
        }}
      >
        <Eye className="mr-2 h-4 w-4" />
        View
      </Button>

      {selected ? (
        <CheckCircle2 className="text-green-600" />
      ) : (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();

            onSelect();
          }}
        >
          Select
        </Button>
      )}
    </div>
  </CardContent>
</Card>
  );
}

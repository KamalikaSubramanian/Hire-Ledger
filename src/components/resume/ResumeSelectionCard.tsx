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
      className={`cursor-pointer transition ${
        selected ? "border-primary border-2" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex gap-8">
          <FileText className="text-primary mt-1" />

          <div>
            <h3 className="font-semibold">{resume.fileName}</h3>

            <p className="text-muted-foreground text-sm">
              Uploaded {new Date(resume.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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

"use client";

import { Resume } from "@/types/resume";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Eye, Download, Trash2, FileText } from "lucide-react";

import { useRouter } from "next/navigation";

interface ResumeHistoryCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export default function ResumeHistoryCard({
  resume,
  onDelete,
}: ResumeHistoryCardProps) {
  const router = useRouter();

  async function handleDownload() {
    try {
      const response = await fetch(resume.url);

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = resume.fileName || "Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="resume-history-card">
      <CardContent className="resume-history-card-content">
        {/* FILE INFORMATION */}
        <div className="resume-history-info">
          <div className="resume-history-file-icon">
            <FileText size={22} />
          </div>

          <div className="resume-history-details">
            <h3 className="resume-history-name">{resume.fileName}</h3>

            <p className="resume-history-date">
              Uploaded {new Date(resume.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="resume-history-actions">
          <Button
            variant="outline"
            size="sm"
            className="resume-history-action"
            onClick={() => router.push(`/resume-library/view/${resume._id}`)}
          >
            <Eye className="h-4 w-4" />

            <span>View</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="resume-history-action"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />

            <span>Download</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="resume-history-action"
            onClick={() => onDelete(resume._id)}
          >
            <Trash2 className="h-4 w-4" />

            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

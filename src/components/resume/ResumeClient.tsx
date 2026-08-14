"use client";

import { useState } from "react";

import ResumeUpload from "./ResumeUpload";
import ResumeHistory from "./ResumeHistory";

import { Resume } from "@/types/resume";

interface Props {
  initialResumes: Resume[];
}

export default function ResumeClient({
  initialResumes,
}: Props) {
  const [resumes, setResumes] =
    useState<Resume[]>(initialResumes);

  return (
    <div className="page-container">
      <div className="resume-page-container">

        <ResumeUpload />

        <ResumeHistory
          resumes={resumes}
          setResumes={setResumes}
        />

      </div>
    </div>
  );
}
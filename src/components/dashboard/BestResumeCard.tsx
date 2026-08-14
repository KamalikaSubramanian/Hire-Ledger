"use client";

import { Trophy, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  resume: any;
}

export default function BestResumeCard({ resume }: Props) {
  const router = useRouter();

  if (!resume) {
    return (
      <div className="best-resume-card">
        <div className="best-resume-header">
          <div className="best-resume-icon">
            <Trophy />
          </div>

          <div>
            <span className="dashboard-card-label">TOP PERFORMER</span>

            <h2 className="best-resume-title">Best Resume</h2>
          </div>
        </div>

        <div className="best-resume-empty">
          <Trophy className="best-resume-empty-icon" />

          <p>No resume analyzed yet.</p>

          <span>
            Analyze a resume to see your highest-performing version here.
          </span>
        </div>
      </div>
    );
  }

  const overallScore = resume.analysisResult?.overallScore ?? 0;
  const atsScore = resume.analysisResult?.atsAnalysis?.atsScore ?? 0;

  return (
    <div className="best-resume-card">
      {/* Header */}
      <div className="best-resume-header">
        <div className="best-resume-icon">
          <Trophy />
        </div>

        <div>
          <span className="dashboard-card-label">TOP PERFORMER</span>

          <h2 className="best-resume-title">Best Resume</h2>
        </div>
      </div>

      {/* Resume information */}
      <div className="best-resume-info">
        <h3>{resume.resumeName}</h3>

        <p className="best-resume-company">
          {resume.company}
        </p>

        <p className="best-resume-job">
          {resume.jobTitle}
        </p>
      </div>

      {/* Scores */}
      <div className="best-resume-scores">
        <div className="best-resume-score-card">
          <span className="best-resume-score-label">
            Overall Score
          </span>

          <strong>{overallScore}</strong>

          <span className="best-resume-score-out-of">
            / 100
          </span>
        </div>

        <div className="best-resume-score-card best-resume-score-card-accent">
          <span className="best-resume-score-label">
            ATS Score
          </span>

          <strong>{atsScore}</strong>

          <span className="best-resume-score-out-of">
            / 100
          </span>
        </div>
      </div>

      {/* Strengths */}
      <div className="best-resume-strengths">
        <div className="best-resume-strength-header">
          <Star />

          <p>Top Strengths</p>
        </div>

        <div className="best-resume-strength-list">
          {resume.analysisResult?.strengths?.slice(0, 3).map(
            (strength: string, index: number) => (
              <div
                key={index}
                className="best-resume-strength-item"
              >
                <span className="best-resume-strength-number">
                  {index + 1}
                </span>

                <span>{strength}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Action */}
      <Button
        className="best-resume-button"
        onClick={() =>
          router.push(`/analysis/${resume._id}`)
        }
      >
        View Analysis

        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
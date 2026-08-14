import {
  FileText,
  ScanSearch,
  BriefcaseBusiness,
  Trophy,
} from "lucide-react";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

function getStatus(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      className: "analysis-status-excellent",
    };
  }

  if (score >= 80) {
    return {
      label: "Very Good",
      className: "analysis-status-very-good",
    };
  }

  if (score >= 70) {
    return {
      label: "Good",
      className: "analysis-status-good",
    };
  }

  return {
    label: "Needs Improvement",
    className: "analysis-status-needs-improvement",
  };
}

export default function AnalysisScoreCards({ analysis }: Props) {
  const result = analysis.analysisResult;

  const scoreCards = [
    {
      title: "Resume Score",
      score: result.resumeHealth.resumeScore,
      icon: FileText,
      accent: "analysis-score-blue",
    },
    {
      title: "ATS Score",
      score: result.atsAnalysis.atsScore,
      icon: ScanSearch,
      accent: "analysis-score-purple",
    },
    {
      title: "Job Match",
      score: result.jobMatch.jobMatchScore,
      icon: BriefcaseBusiness,
      accent: "analysis-score-pink",
    },
    {
      title: "Overall",
      score: result.overallScore,
      icon: Trophy,
      accent: "analysis-score-primary",
    },
  ];

  return (
    <section className="analysis-score-grid">
      {scoreCards.map((card) => {
        const Icon = card.icon;
        const status = getStatus(card.score);

        return (
          <article
            key={card.title}
            className={`analysis-score-card ${card.accent}`}
          >
            {/* Top */}
            <div className="analysis-score-card-top">
              <div className="analysis-score-icon">
                <Icon />
              </div>

              <span
                className={`analysis-score-status ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            {/* Title */}
            <p className="analysis-score-label">
              {card.title}
            </p>

            {/* Score */}
            <div className="analysis-score-value">
              <span>{card.score}</span>
              <small>%</small>
            </div>

            {/* Progress */}
            <div className="analysis-score-progress">
              <div
                className="analysis-score-progress-fill"
                style={{
                  width: `${Math.min(card.score, 100)}%`,
                }}
              />
            </div>

            {/* Bottom text */}
            <div className="analysis-score-footer">
              <span>Score</span>
              <span>{card.score}/100</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
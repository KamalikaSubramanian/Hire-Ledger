"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, Eye, FileSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Analysis {
  _id: string;
  company: string;
  jobTitle: string;
  createdAt: string;

  analysisResult: {
    overallScore: number;
  };
}

interface Props {
  analyses: Analysis[];
}

export default function RecentAnalyses({ analyses }: Props) {
  const router = useRouter();

  return (
    <div className="recent-analyses-card">
      {/* Header */}
      <div className="recent-analyses-header">
        <div className="recent-analyses-title-wrapper">
          <div className="recent-analyses-icon">
            <FileSearch />
          </div>

          <div>
            <h3 className="recent-analyses-title">
              Recent Analyses
            </h3>

            <p className="recent-analyses-subtitle">
              Quickly access your latest resume analysis results
            </p>
          </div>
        </div>

        {analyses.length > 0 && (
          <span className="recent-analyses-count">
            {analyses.length} recent
          </span>
        )}
      </div>

      {/* Analysis List */}
      {analyses.length === 0 ? (
        <div className="recent-analyses-empty">
          <div className="recent-analyses-empty-icon">
            <FileSearch />
          </div>

          <h4>No analyses yet</h4>

          <p>
            Analyze your resume against a job description to see
            your results here.
          </p>

          <Button
            className="recent-analyses-empty-button"
            onClick={() => router.push("/analyze")}
          >
            Analyze Resume
            <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="recent-analyses-list">
          {analyses.map((analysis, index) => {
            const score =
              analysis.analysisResult?.overallScore ?? 0;

            return (
              <div
                key={analysis._id}
                className="recent-analysis-item"
                style={{
                  animationDelay: `${index * 90}ms`,
                }}
              >
                {/* Left content */}
                <div className="recent-analysis-info">
                  <div className="recent-analysis-company-row">
                    <div className="recent-analysis-company-icon">
                      <FileSearch />
                    </div>

                    <div className="recent-analysis-company-wrapper">
                      <h4 className="recent-analysis-company">
                        {analysis.company}
                      </h4>

                      <p className="recent-analysis-job">
                        {analysis.jobTitle}
                      </p>
                    </div>
                  </div>

                  <div className="recent-analysis-date">
                    <CalendarDays />

                    <span>
                      {new Date(
                        analysis.createdAt
                      ).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>

                {/* Right content */}
                <div className="recent-analysis-right">
                  <div
                    className={`recent-analysis-score ${
                      score >= 80
                        ? "score-excellent"
                        : score >= 60
                          ? "score-good"
                          : "score-low"
                    }`}
                  >
                    <span className="recent-analysis-score-value">
                      {score}
                    </span>

                    <span className="recent-analysis-score-label">
                      Score
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="recent-analysis-view-button"
                    onClick={() =>
                      router.push(`/analysis/${analysis._id}`)
                    }
                  >
                    <Eye />
                    <span>View</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {analyses.length > 0 && (
        <div className="recent-analyses-footer">
          <Button
            variant="outline"
            className="recent-analyses-history-button"
            onClick={() => router.push("/analysisHistory")}
          >
            View Analysis History
            <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}
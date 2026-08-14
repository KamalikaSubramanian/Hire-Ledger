"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  analyses: any[];
}

export default function AnalysisTable({ analyses }: Props) {
  const router = useRouter();

  if (analyses.length === 0) {
    return (
      <div className="analysis-empty-card">
        <h2 className="analysis-empty-title">No Analysis Found</h2>

        <p className="analysis-empty-description">
          Upload a resume to start your first analysis.
        </p>
      </div>
    );
  }

  function getScoreClass(score: number) {
    if (score >= 70) {
      return "analysis-score-high";
    }

    if (score >= 50) {
      return "analysis-score-medium";
    }

    return "analysis-score-low";
  }

  return (
    <div className="analysis-table-card">
      <div className="analysis-table-wrapper">
        <table className="analysis-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>ATS Score</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {analyses.map((analysis) => {
              const score = analysis.analysisResult?.atsAnalysis?.atsScore ?? 0;

              return (
                <tr key={analysis._id}>
                  <td>
                    <span className="analysis-job-title">
                      {analysis.jobTitle}
                    </span>
                  </td>

                  <td>
                    <span className="analysis-company">
                      {analysis.company || "—"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`analysis-score-badge ${getScoreClass(score)}`}
                    >
                      {score}%
                    </span>
                  </td>

                  <td>
                    <span className="analysis-date">
                      {new Date(analysis.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </td>

                  <td>
                    <Button
                      variant="outline"
                      size="sm"
                      className="analysis-view-button"
                      onClick={(e) => {
                        e.stopPropagation();

                        router.push(`/analysis/${analysis._id}`);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { AlertTriangle } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function FormattingIssues({
  analysis,
}: Props) {
  const issues = analysis.atsAnalysis.formattingIssues;

  return (
    <section className="analysis-ats-card analysis-issue-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            Formatting Issues
          </h2>

          <p className="analysis-card-description">
            Formatting problems that may affect ATS readability.
          </p>
        </div>

        <div className="analysis-issue-icon analysis-issue-warning">
          <AlertTriangle />
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="analysis-no-issues">
          <span>✓</span>
          No formatting issues detected.
        </div>
      ) : (
        <div className="analysis-issue-list">
          {issues.map((issue: string, index: number) => (
            <div
              key={index}
              className="analysis-issue-item"
            >
              <AlertTriangle className="analysis-issue-item-icon analysis-warning-icon" />

              <p>{issue}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
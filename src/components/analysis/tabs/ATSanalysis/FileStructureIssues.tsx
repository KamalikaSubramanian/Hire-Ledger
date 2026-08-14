import { FileWarning } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function FileStructureIssues({
  analysis,
}: Props) {
  const issues = analysis.atsAnalysis.fileStructureIssues;

  return (
    <section className="analysis-ats-card analysis-issue-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            File Structure Issues
          </h2>

          <p className="analysis-card-description">
            File-level issues that may affect resume processing.
          </p>
        </div>

        <div className="analysis-issue-icon analysis-issue-danger">
          <FileWarning />
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="analysis-no-issues">
          <span>✓</span>
          No file structure issues detected.
        </div>
      ) : (
        <div className="analysis-issue-list">
          {issues.map((issue: string, index: number) => (
            <div
              key={index}
              className="analysis-issue-item"
            >
              <FileWarning className="analysis-issue-item-icon analysis-danger-icon" />

              <p>{issue}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
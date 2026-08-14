import { ScanSearch } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function ParsingIssues({
  analysis,
}: Props) {
  const issues = analysis.atsAnalysis.parsingIssues;

  return (
    <section className="analysis-ats-card analysis-issue-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            Parsing Issues
          </h2>

          <p className="analysis-card-description">
            Problems that could prevent an ATS from correctly reading your resume.
          </p>
        </div>

        <div className="analysis-issue-icon analysis-issue-orange">
          <ScanSearch />
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="analysis-no-issues">
          <span>✓</span>
          No parsing issues detected.
        </div>
      ) : (
        <div className="analysis-issue-list">
          {issues.map((issue: string, index: number) => (
            <div
              key={index}
              className="analysis-issue-item"
            >
              <ScanSearch className="analysis-issue-item-icon analysis-orange-icon" />

              <p>{issue}</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
import { XCircle } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function MissingKeywords({
  analysis,
}: Props) {
  const keywords = analysis.atsAnalysis.missingKeywords;

  return (
    <section className="analysis-ats-card analysis-keyword-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            Missing Keywords
          </h2>

          <p className="analysis-card-description">
            Important keywords that are missing from your resume.
          </p>
        </div>

        <span className="analysis-keyword-count analysis-keyword-count-danger">
          {keywords.length}
        </span>
      </div>

      {keywords.length === 0 ? (
        <p className="analysis-empty">
          No missing keywords found.
        </p>
      ) : (
        <div className="analysis-keyword-list">
          {keywords.map((keyword: string) => (
            <div
              key={keyword}
              className="analysis-keyword analysis-keyword-danger"
            >
              <XCircle />

              <span>{keyword}</span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
import { CheckCircle2 } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function MatchedKeywords({
  analysis,
}: Props) {
  const keywords = analysis.atsAnalysis.matchedKeywords;

  return (
    <section className="analysis-ats-card analysis-keyword-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            Matched Keywords
          </h2>

          <p className="analysis-card-description">
            Keywords from your resume that match the job description.
          </p>
        </div>

        <span className="analysis-keyword-count analysis-keyword-count-success">
          {keywords.length}
        </span>
      </div>

      {keywords.length === 0 ? (
        <p className="analysis-empty">
          No matched keywords found.
        </p>
      ) : (
        <div className="analysis-keyword-list">
          {keywords.map((keyword: string) => (
            <div
              key={keyword}
              className="analysis-keyword analysis-keyword-success"
            >
              <CheckCircle2 />

              <span>{keyword}</span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
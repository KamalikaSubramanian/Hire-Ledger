import { BriefcaseBusiness } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function IndustryKeywords({
  analysis,
}: Props) {
  const keywords = analysis.atsAnalysis.industryKeywords;

  return (
    <section className="analysis-ats-card analysis-keyword-card">

      <div className="analysis-card-header">
        <div>
          <h2 className="analysis-card-title">
            Industry Keywords
          </h2>

          <p className="analysis-card-description">
            Relevant terms commonly used in your target industry.
          </p>
        </div>

        <span className="analysis-keyword-count analysis-keyword-count-info">
          {keywords.length}
        </span>
      </div>

      {keywords.length === 0 ? (
        <p className="analysis-empty">
          No industry keywords identified.
        </p>
      ) : (
        <div className="analysis-keyword-list">
          {keywords.map((keyword: string) => (
            <div
              key={keyword}
              className="analysis-keyword analysis-keyword-info"
            >
              <BriefcaseBusiness />

              <span>{keyword}</span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
import { Lightbulb } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function ATSSuggestions({
  analysis,
}: Props) {
  const suggestions = analysis.atsAnalysis.atsSuggestions;

  return (
    <section className="analysis-ats-card analysis-suggestions-card">

      <div className="analysis-suggestions-header">

        <div className="analysis-suggestions-icon">
          <Lightbulb />
        </div>

        <div>
          <h2 className="analysis-card-title">
            ATS Suggestions
          </h2>

          <p className="analysis-card-description">
            Practical recommendations to improve your ATS compatibility.
          </p>
        </div>

      </div>

      {suggestions.length === 0 ? (
        <p className="analysis-empty">
          No additional suggestions.
        </p>
      ) : (
        <div className="analysis-suggestion-list">

          {suggestions.map(
            (item: string, index: number) => (
              <div
                key={index}
                className="analysis-suggestion-item"
              >
                <span className="analysis-suggestion-number">
                  {index + 1}
                </span>

                <p>{item}</p>
              </div>
            )
          )}

        </div>
      )}

    </section>
  );
}
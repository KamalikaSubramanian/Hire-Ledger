import { CheckCircle2 } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function StrengthsCard({ analysis }: Props) {
  return (
    <section className="analysis-content-card">

      <div className="analysis-content-card-header">
        <div className="analysis-content-card-heading">
          <div className="analysis-content-icon analysis-content-icon-success">
            <CheckCircle2 />
          </div>

          <div>
            <h2>Strengths</h2>

            <p>
              What is already working well in your resume.
            </p>
          </div>
        </div>

        <span className="analysis-count-badge analysis-count-success">
          {analysis.strengths.length}
        </span>
      </div>

      <div className="analysis-list">

        {analysis.strengths?.map(
          (item: string, index: number) => (
            <div
              key={index}
              className="analysis-list-item analysis-list-success"
            >
              <CheckCircle2 />

              <p>{item}</p>
            </div>
          )
        )}

      </div>

    </section>
  );
}
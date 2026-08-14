import { AlertTriangle } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function WeaknessesCard({
  analysis,
}: Props) {
  return (
    <section className="analysis-content-card">

      <div className="analysis-content-card-header">

        <div className="analysis-content-card-heading">

          <div className="analysis-content-icon analysis-content-icon-warning">
            <AlertTriangle />
          </div>

          <div>
            <h2>Areas to Improve</h2>

            <p>
              Things you can improve to strengthen your resume.
            </p>
          </div>

        </div>

        <span className="analysis-count-badge analysis-count-warning">
          {analysis.weaknesses.length}
        </span>

      </div>

      <div className="analysis-list">

        {analysis.weaknesses?.map(
          (item: string, index: number) => (
            <div
              key={index}
              className="analysis-list-item analysis-list-warning"
            >
              <AlertTriangle />

              <p>{item}</p>
            </div>
          )
        )}

      </div>

    </section>
  );
}
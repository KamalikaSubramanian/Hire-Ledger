import { Sparkles } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function MotivationCard({
  analysis,
}: Props) {
  return (
    <section className="analysis-motivation-card">

      <div className="analysis-motivation-header">

        <div className="analysis-motivation-icon">
          <Sparkles />
        </div>

        <div>
          <h2>AI Motivation</h2>

          <p>
            A quick perspective based on your analysis.
          </p>
        </div>

      </div>

      <p className="analysis-motivation-text">
        {analysis.motivation}
      </p>

    </section>
  );
}
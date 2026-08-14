import {
  CheckCircle,
  XCircle,
  Search,
  Target,
} from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function QuickSummaryCards({ analysis }: Props) {
  return (
    <div className="analysis-summary-grid">

      {/* Resume Score */}
      <div className="analysis-summary-card">
        <div className="analysis-summary-icon">
          <Target />
        </div>

        <p className="analysis-summary-label">
          Resume Score
        </p>

        <h2 className="analysis-summary-value">
          {analysis.resumeHealth.resumeScore}
          <span>%</span>
        </h2>
      </div>

      {/* ATS Score */}
      <div className="analysis-summary-card">
        <div className="analysis-summary-icon">
          <Search />
        </div>

        <p className="analysis-summary-label">
          ATS Score
        </p>

        <h2 className="analysis-summary-value">
          {analysis.atsAnalysis.atsScore}
          <span>%</span>
        </h2>
      </div>

      {/* Strengths */}
      <div className="analysis-summary-card">
        <div className="analysis-summary-icon analysis-summary-icon-success">
          <CheckCircle />
        </div>

        <p className="analysis-summary-label">
          Strengths
        </p>

        <h2 className="analysis-summary-value">
          {analysis.strengths.length}
        </h2>
      </div>

      {/* Improvements */}
      <div className="analysis-summary-card">
        <div className="analysis-summary-icon analysis-summary-icon-warning">
          <XCircle />
        </div>

        <p className="analysis-summary-label">
          Improvements
        </p>

        <h2 className="analysis-summary-value">
          {analysis.weaknesses.length}
        </h2>
      </div>

    </div>
  );
}
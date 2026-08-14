import {
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { SummaryReview } from "@/types/analysis";

interface Props {
  summary: SummaryReview;
}

export default function SummarySection({
  summary,
}: Props) {
  return (
    <div className="section-review-card">

      <div className="section-review-header">
        <div className="section-review-icon">
          <FileText />
        </div>

        <h2>Professional Summary</h2>
      </div>

      {/* Status */}
      <div className="section-review-status">
        <span className="section-review-label">
          Status
        </span>

        <span
          className={`section-review-status-badge ${
            summary.status === "Complete"
              ? "status-success"
              : "status-warning"
          }`}
        >
          {summary.status}
        </span>
      </div>

      {/* Suggestions */}
      {summary.suggestions?.length > 0 && (
        <div className="section-review-group">

          <h3>Suggestions</h3>

          <ul className="section-review-list">
            {summary.suggestions.map(
              (item: string, index: number) => (
                <li
                  key={index}
                  className="section-review-list-item"
                >
                  <CheckCircle2 className="suggestion-icon" />

                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

        </div>
      )}

      {/* Missing */}
      {summary.missing?.length > 0 && (
        <div className="section-review-group">

          <h3>Missing</h3>

          <ul className="section-review-list">
            {summary.missing.map(
              (item: string, index: number) => (
                <li
                  key={index}
                  className="section-review-list-item"
                >
                  <AlertCircle className="missing-icon" />

                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

        </div>
      )}

    </div>
  );
}
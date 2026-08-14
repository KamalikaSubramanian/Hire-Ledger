import { Award, CheckCircle2 } from "lucide-react";

import { CertificationsReview } from "@/types/analysis";

interface Props {
  certifications: CertificationsReview;
}

export default function CertificationsSection({ certifications }: Props) {
  return (
    <div className="section-review-card">
      <div className="section-review-header">
        <div className="section-review-icon">
          <Award />
        </div>

        <h2>Certifications</h2>
      </div>

      <div className="section-review-status">
        <span className="section-review-label">Status</span>

        <span
          className={`section-review-status-badge ${
            certifications.status === "Complete"
              ? "status-success"
              : "status-warning"
          }`}
        >
          {certifications.status}
        </span>
      </div>

      {certifications.suggestions?.length > 0 && (
        <div className="section-review-group">
          <h3>Suggestions</h3>

          <ul className="section-review-list">
            {certifications.suggestions.map((item: string, index: number) => (
              <li key={index} className="section-review-list-item">
                <CheckCircle2 className="suggestion-icon" />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

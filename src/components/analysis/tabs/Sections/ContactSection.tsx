import {
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { ContactReview } from "@/types/analysis";

interface Props {
  contact: ContactReview;
}

export default function ContactSection({
  contact,
}: Props) {
  return (
    <div className="section-review-card">

      <div className="section-review-header">
        <div className="section-review-icon">
          <Phone />
        </div>

        <h2>Contact Information</h2>
      </div>

      {/* Status */}
      <div className="section-review-status">
        <span className="section-review-label">
          Status
        </span>

        <span
          className={`section-review-status-badge ${
            contact.status === "Complete"
              ? "status-success"
              : "status-warning"
          }`}
        >
          {contact.status}
        </span>
      </div>

      {/* Suggestions */}
      {contact.suggestions?.length > 0 && (
        <div className="section-review-group">

          <h3>Suggestions</h3>

          <ul className="section-review-list">
            {contact.suggestions.map(
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
      {contact.missing?.length > 0 && (
        <div className="section-review-group">

          <h3>Missing</h3>

          <ul className="section-review-list">
            {contact.missing.map(
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
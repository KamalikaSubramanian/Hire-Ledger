import {
  GraduationCap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { EducationReview } from "@/types/analysis";

interface Props {
  education: EducationReview;
}

export default function EducationSection({
  education,
}: Props) {
  return (
    <div className="section-review-card">

      <div className="section-review-header">
        <div className="section-review-icon">
          <GraduationCap />
        </div>

        <h2>Education</h2>
      </div>

      <div className="section-info-grid education-grid">

        <div className="section-info-item">
          <span className="section-review-label">
            Required
          </span>

          <p>
            {education.requiredQualification || "-"}
          </p>
        </div>

        <div className="section-info-item">
          <span className="section-review-label">
            Detected
          </span>

          <p>
            {education.detectedQualification || "-"}
          </p>
        </div>

        <div className="section-info-item">
          <span className="section-review-label">
            Qualification Match
          </span>

          <div
            className={`qualification-result ${
              education.qualificationMatch
                ? "qualification-match"
                : "qualification-no-match"
            }`}
          >
            {education.qualificationMatch ? (
              <>
                <CheckCircle2 />
                Yes
              </>
            ) : (
              <>
                <XCircle />
                No
              </>
            )}
          </div>
        </div>

      </div>

      {education.suggestions?.length > 0 && (
        <div className="section-review-group">

          <h3>Suggestions</h3>

          <ul className="section-review-list">

            {education.suggestions.map(
              (item: string, index: number) => (
                <li
                  key={index}
                  className="section-review-list-item"
                >
                  <span className="list-bullet" />

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
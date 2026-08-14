import { BriefcaseBusiness } from "lucide-react";

import { ExperienceReview } from "@/types/analysis";

interface Props {
  experience: ExperienceReview;
}

export default function ExperienceSection({
  experience,
}: Props) {
  return (
    <div className="section-review-card">

      <div className="section-review-header">
        <div className="section-review-icon">
          <BriefcaseBusiness />
        </div>

        <h2>Experience</h2>
      </div>

      <div className="section-info-grid">

        <div className="section-info-item">
          <span className="section-review-label">
            Required
          </span>

          <p>
            {experience.requiredExperience || "-"}
          </p>
        </div>

        <div className="section-info-item">
          <span className="section-review-label">
            Detected
          </span>

          <p>
            {experience.detectedExperience || "-"}
          </p>
        </div>

        <div className="section-info-item">
          <span className="section-review-label">
            Level
          </span>

          <p>
            {experience.experienceLevel || "-"}
          </p>
        </div>

      </div>

      {experience.suggestions?.length > 0 && (
        <div className="section-review-group">

          <h3>Suggestions</h3>

          <ul className="section-review-list">

            {experience.suggestions.map(
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
import {
  FolderKanban,
  CheckCircle2,
} from "lucide-react";

import { ProjectsReview } from "@/types/analysis";

interface Props {
  projects: ProjectsReview;
}

export default function ProjectsSection({
  projects,
}: Props) {
  return (
    <div className="section-review-card">

      <div className="section-review-header">
        <div className="section-review-icon">
          <FolderKanban />
        </div>

        <h2>Projects</h2>
      </div>

      <div className="section-review-status">
        <span className="section-review-label">
          Status
        </span>

        <span
          className={`section-review-status-badge ${
            projects.status === "Complete"
              ? "status-success"
              : "status-warning"
          }`}
        >
          {projects.status}
        </span>
      </div>

      {projects.suggestions?.length > 0 && (
        <div className="section-review-group">

          <h3>Suggestions</h3>

          <ul className="section-review-list">

            {projects.suggestions.map(
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

    </div>
  );
}
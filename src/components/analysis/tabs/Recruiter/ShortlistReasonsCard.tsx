import { CheckCircle2 } from "lucide-react";

interface Props {
  reasons: string[];
}

export default function ShortlistReasonsCard({
  reasons,
}: Props) {
  return (
    <div className="recruiter-scan-card ">

      <div className="recruiter-card-header">

        <div className="recruiter-card-heading">

          <div className="recruiter-card-icon">
            <CheckCircle2 />
          </div>

          <div>
            <h2>Top Reasons to Shortlist</h2>

            <p className="recruiter-description">
              Key factors that can increase the chances of
              your resume being shortlisted.
            </p>
          </div>

        </div>

      </div>

      <div className="recruiter-list">

        {reasons?.length > 0 ? (
          reasons.map((item, index) => (
            <div
              key={index}
              className="recruiter-list-item recruiter-list-success"
            >
              <CheckCircle2 className="recruiter-list-icon" />

              <span>{item}</span>
            </div>
          ))
        ) : (
          <p className="recruiter-empty">
            No shortlist reasons available.
          </p>
        )}

      </div>

    </div>
  );
}
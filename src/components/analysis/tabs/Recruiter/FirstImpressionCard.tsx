import { Eye } from "lucide-react";

interface Props {
  firstImpression: string;
}

export default function FirstImpressionCard({
  firstImpression,
}: Props) {
  return (
    <div className="recruiter-scan-card">

      <div className="recruiter-card-header">

        <div className="recruiter-card-heading">

          <div className="recruiter-card-icon">
            <Eye />
          </div>

          <div>
            <h2>First Impression</h2>

            <p className="recruiter-description">
              How a recruiter is likely to perceive your resume
              during the initial screening.
            </p>
          </div>

        </div>

      </div>

      <div className="recruiter-content-box">
        <p className="recruiter-main-text">
          {firstImpression}
        </p>
      </div>

    </div>
  );
}
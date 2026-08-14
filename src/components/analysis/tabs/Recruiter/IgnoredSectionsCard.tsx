import { EyeOff } from "lucide-react";

interface Props {
  ignored: string[];
}

export default function IgnoredSectionsCard({
  ignored,
}: Props) {
  return (
    <div className="recruiter-scan-card ">

      <div className="recruiter-card-header">

        <div className="recruiter-card-heading">

          <div className="recruiter-card-icon">
            <EyeOff />
          </div>

          <div>
            <h2>Sections Recruiters May Ignore</h2>

            <p className="recruiter-description">
              Resume sections that may receive less attention
              during a quick recruiter review.
            </p>
          </div>

        </div>

      </div>

      <div className="recruiter-list">

        {ignored?.length > 0 ? (
          ignored.map((item, index) => (
            <div
              key={index}
              className="recruiter-list-item recruiter-list-warning"
            >
              <EyeOff className="recruiter-list-icon" />

              <span>{item}</span>
            </div>
          ))
        ) : (
          <p className="recruiter-empty">
            No sections are expected to be ignored.
          </p>
        )}

      </div>

    </div>
  );
}
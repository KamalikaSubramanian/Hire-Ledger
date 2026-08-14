import { XCircle } from "lucide-react";

interface Props {
  reasons: string[];
}

export default function RejectReasonsCard({
  reasons,
}: Props) {
  return (
    <div className="recruiter-scan-card ">

      <div className="recruiter-card-header">

        <div className="recruiter-card-heading">

          <div className="recruiter-card-icon">
            <XCircle />
          </div>

          <div>
            <h2>Possible Rejection Reasons</h2>

            <p className="recruiter-description">
              Potential issues that may reduce your chances
              during recruiter screening.
            </p>
          </div>

        </div>

      </div>

      <div className="recruiter-list">

        {reasons?.length > 0 ? (
          reasons.map((item, index) => (
            <div
              key={index}
              className="recruiter-list-item recruiter-list-danger"
            >
              <XCircle className="recruiter-list-icon" />

              <span>{item}</span>
            </div>
          ))
        ) : (
          <p className="recruiter-empty">
            No major rejection reasons identified.
          </p>
        )}

      </div>

    </div>
  );
}
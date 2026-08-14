import { TrendingUp } from "lucide-react";

interface Props {
  score: number;
}

export default function InterviewChanceCard({ score }: Props) {
  function getStatus(score: number) {
    if (score >= 85) {
      return {
        label: "Excellent",
        color: "recruiter-status-success",
      };
    }

    if (score >= 70) {
      return {
        label: "Good",
        color: "recruiter-status-good",
      };
    }

    if (score >= 50) {
      return {
        label: "Average",
        color: "recruiter-status-average",
      };
    }

    return {
      label: "Low",
      color: "recruiter-status-low",
    };
  }

  const status = getStatus(score);

  return (
    <div className="recruiter-scan-card">

      <div className="recruiter-card-header">

        <div className="recruiter-card-heading">
          <div className="recruiter-card-icon">
            <TrendingUp />
          </div>

          <div>
            <h2>Estimated Interview Chance</h2>

            <p>
              Estimated likelihood of getting shortlisted based on
              ATS compatibility, recruiter expectations, and job match.
            </p>
          </div>
        </div>

      </div>

      <div className="interview-score-row">

        <span className="interview-score">
          {score}%
        </span>

        <span className={`interview-status ${status.color}`}>
          {status.label}
        </span>

      </div>

      <div className="interview-progress">
        <div
          className="interview-progress-value"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>

    </div>
  );
}
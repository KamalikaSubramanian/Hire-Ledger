"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  recommendations: string[];
}

export default function AIRecommendations({
  recommendations,
}: Props) {
  return (
    <div className="ai-recommendations-card">
      {/* Header */}
      <div className="ai-recommendations-header">
        <div className="ai-recommendations-icon">
          <Sparkles />
        </div>

        <div>
          <span className="dashboard-card-label">
            AI INSIGHTS
          </span>

          <h2 className="ai-recommendations-title">
            AI Recommendations
          </h2>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length === 0 ? (
        <div className="ai-recommendations-empty">
          <Sparkles />

          <p>No recommendations available yet.</p>

          <span>
            Complete a resume analysis to receive personalized
            suggestions.
          </span>
        </div>
      ) : (
        <div className="ai-recommendations-list">
          {recommendations.map((item, index) => (
            <div
              key={index}
              className="ai-recommendation-item"
            >
              {/* Number */}
              <div className="ai-recommendation-number">
                {index + 1}
              </div>

              {/* Content */}
              <div className="ai-recommendation-content">
                <div className="ai-recommendation-heading">
                  <CheckCircle2 />

                  <span>
                    Recommendation {index + 1}
                  </span>
                </div>

                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
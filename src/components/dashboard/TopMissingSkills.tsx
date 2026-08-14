"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, TrendingDown } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  skills: {
    skill: string;
    count: number;
  }[];
}

export default function TopMissingSkills({ skills }: Props) {
  const router = useRouter();

  const topSkills = skills.slice(0, 3);

  const maxCount =
    topSkills.length > 0
      ? Math.max(...topSkills.map((skill) => skill.count))
      : 1;

  return (
    <div className="missing-skills-card">
      {/* Header */}
      <div className="missing-skills-header">
        <div className="missing-skills-title-wrapper">
          <div className="missing-skills-icon">
            <TrendingDown />
          </div>

          <div>
            <h3 className="missing-skills-title">Top Missing Skills</h3>

            <p className="missing-skills-subtitle">
              Skills appearing most often in your analyses
            </p>
          </div>
        </div>

        {skills.length > 0 && (
          <span className="missing-skills-count">
            {skills.length} skills
          </span>
        )}
      </div>

      {/* Content */}
      {topSkills.length === 0 ? (
        <div className="missing-skills-empty">
          <div className="missing-skills-empty-icon">
            ✓
          </div>

          <p>No missing skills found.</p>

          <span>
            Your analyzed resumes currently look good.
          </span>
        </div>
      ) : (
        <div className="missing-skills-list">
          {topSkills.map((skill, index) => {
            const percentage = Math.round(
              (skill.count / maxCount) * 100
            );

            return (
              <div
                key={skill.skill}
                className="missing-skill-item"
              >
                {/* Top row */}
                <div className="missing-skill-top">
                  <div className="missing-skill-name-wrapper">
                    <span className="missing-skill-rank">
                      {index + 1}
                    </span>

                    <span className="missing-skill-name">
                      {skill.skill}
                    </span>
                  </div>

                  <span className="missing-skill-percentage">
                    {percentage}%
                  </span>
                </div>

                {/* Progress */}
                <div className="missing-skill-progress-wrapper">
                  <Progress
                    value={percentage}
                    className="missing-skill-progress"
                  />
                </div>

                {/* Analysis count */}
                <p className="missing-skill-count-text">
                  Missing in{" "}
                  <strong>{skill.count}</strong>{" "}
                  {skill.count === 1 ? "analysis" : "analyses"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="missing-skills-footer">
        <Button
          variant="outline"
          className="missing-skills-button"
          onClick={() => router.push("/skills")}
        >
          View All Skills
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
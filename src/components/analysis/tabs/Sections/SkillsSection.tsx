import { Award } from "lucide-react";

import { SkillsReview } from "@/types/analysis";

interface Props {
  skills: SkillsReview;
}

export default function SkillsSection({ skills }: Props) {
  const groups = [
    {
      title: "Matched Skills",
      skills: skills.matched,
      className: "skill-matched",
    },
    {
      title: "Missing Skills",
      skills: skills.missing,
      className: "skill-missing",
    },
    {
      title: "Industry Specific Skills",
      skills: skills.industrySpecific,
      className: "skill-industry",
    },
    {
      title: "Recommended Skills",
      skills: skills.recommended,
      className: "skill-recommended",
    },
  ];

  return (
    <div className="section-review-card">
      <div className="section-review-header">
        <div className="section-review-icon">
          <Award />
        </div>

        <h2>Skills Review</h2>
      </div>

      <div className="skills-review-container">
        {groups.map((group) => (
          <div key={group.title} className="skills-review-group">
            <h3>{group.title}</h3>

            {group.skills?.length > 0 ? (
              <div className="skills-list">
                {group.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className={`skill-badge ${group.className}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="section-review-empty">None identified</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

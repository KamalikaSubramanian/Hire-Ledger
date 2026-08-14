"use client";

import {
  BrainCircuit,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface Props {
  stats: {
    totalSkills: number;
    frequentlyMissing: number;
    strongSkills: number;
  };
}

export default function SkillsStatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Total Skills",
      value: stats.totalSkills,
      description: "Skills identified",
      icon: BrainCircuit,
      className: "skills-kpi-blue",
    },
    {
      title: "Frequently Missing",
      value: stats.frequentlyMissing,
      description: "Skills to improve",
      icon: AlertTriangle,
      className: "skills-kpi-orange",
    },
    {
      title: "Strong Skills",
      value: stats.strongSkills,
      description: "Skills matching well",
      icon: Sparkles,
      className: "skills-kpi-green",
    },
  ];

  return (
    <div className="skills-stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`skills-stat-card ${card.className}`}
          >
            <div className="skills-stat-top">
              <div className="skills-stat-icon">
                <Icon />
              </div>

              <span className="skills-stat-label">
                {card.title}
              </span>
            </div>

            <div className="skills-stat-main">
              <h2 className="skills-stat-value">
                {card.value}
              </h2>

              <p className="skills-stat-description">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
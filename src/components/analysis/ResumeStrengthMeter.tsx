import {
  Award,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  ScanSearch,
  LayoutPanelTop,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

function getLevel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";
  return "Weak";
}

export default function ResumeStrengthMeter({ analysis }: Props) {
  const meter =
    analysis.analysisResult?.resumeHealth?.strengthMeter;

  if (!meter) return null;

  const items = [
    {
      title: "ATS",
      value: meter.ats,
      icon: ScanSearch,
      accent: "strength-blue",
    },
    {
      title: "Projects",
      value: meter.projects,
      icon: FolderKanban,
      accent: "strength-purple",
    },
    {
      title: "Skills",
      value: meter.skills,
      icon: Award,
      accent: "strength-pink",
    },
    {
      title: "Experience",
      value: meter.experience,
      icon: BriefcaseBusiness,
      accent: "strength-indigo",
    },
    {
      title: "Education",
      value: meter.education,
      icon: GraduationCap,
      accent: "strength-blue",
    },
    {
      title: "Formatting",
      value: meter.formatting,
      icon: LayoutPanelTop,
      accent: "strength-purple",
    },
    {
      title: "Certifications",
      value: meter.certifications,
      icon: BadgeCheck,
      accent: "strength-pink",
    },
    {
      title: "Credentials",
      value: meter.credentials,
      icon: ShieldCheck,
      accent: "strength-indigo",
    },
  ];

  return (
    <section className="analysis-strength-section">
      {/* Header */}

      <div className="analysis-strength-header">
        <div>
          <div className="analysis-strength-heading">
            <div className="analysis-strength-heading-icon">
              <Award />
            </div>

            <div>
              <h2 className="analysis-strength-title">
                Resume Strength Meter
              </h2>

              <p className="analysis-strength-description">
                Quick overview of your resume quality across
                important areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strength Items */}

      <div className="analysis-strength-grid">
        {items.map((item) => {
          const Icon = item.icon;
          const value = Math.min(Math.max(item.value, 0), 100);

          return (
            <article
              key={item.title}
              className={`analysis-strength-card ${item.accent}`}
            >
              {/* Top */}

              <div className="analysis-strength-card-top">
                <div className="analysis-strength-item-info">
                  <div className="analysis-strength-icon">
                    <Icon />
                  </div>

                  <div>
                    <span className="analysis-strength-item-title">
                      {item.title}
                    </span>

                    <span className="analysis-strength-level">
                      {getLevel(value)}
                    </span>
                  </div>
                </div>

                <div className="analysis-strength-score">
                  <span>{value}</span>
                  <small>%</small>
                </div>
              </div>

              {/* Progress */}

              <div className="analysis-strength-progress">
                <div
                  className="analysis-strength-progress-fill"
                  style={{
                    width: `${value}%`,
                  }}
                />
              </div>

              {/* Footer */}

              <div className="analysis-strength-footer">
                <span>Resume quality</span>

                <span>{value}/100</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
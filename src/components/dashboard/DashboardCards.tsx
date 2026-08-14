import {
  FileSearch,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  stats: {
    totalAnalysis: number;
    totalResumes: number;
    avgATS: number;
    highestATS: number;
  };
}

export default function DashboardCards({ stats }: Props) {
  const cards = [
    {
      title: "Total Analyses",
      value: stats.totalAnalysis,
      icon: FileSearch,
    },
    {
      title: "Uploaded Resumes",
      value: stats.totalResumes,
      icon: FileText,
    },
    {
      title: "Average ATS",
      value: `${stats.avgATS}%`,
      icon: TrendingUp,
    },
    {
      title: "Highest ATS",
      value: `${stats.highestATS}%`,
      icon: Award,
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="dashboard-stat-card"
          >
            <CardContent className="dashboard-stat-content">
              <div className="dashboard-stat-info">
                <p className="dashboard-stat-title">
                  {card.title}
                </p>

                <h2 className="dashboard-stat-value">
                  {card.value}
                </h2>
              </div>

              <div className="dashboard-stat-icon">
                <Icon />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
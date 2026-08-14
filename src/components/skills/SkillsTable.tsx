"use client";

import { BadgeCheck, CircleAlert, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

interface Skill {
  skill: string;

  missingCount: number;

  matchedCount: number;

  missingPercentage: number;

  proficiency: string;

  priority: string;

  missingIn: {
    analysisId: string;
    company: string;
    jobTitle: string;
  }[];

  matchedIn: {
    analysisId: string;
    company: string;
    jobTitle: string;
  }[];
}

interface Props {
  skills: Skill[];
}

export default function SkillsTable({ skills }: Props) {
  const router = useRouter();

  if (!skills.length) {
    return <div className="skills-empty-state">No skills found.</div>;
  }

  return (
    <div className="skills-table-wrapper">
      <table className="skills-table">
        <thead className="skills-table-head">
          <tr className="skills-table-head-row">
            <th>Skill</th>
            <th>Missing %</th>
            <th>Proficiency</th>
            <th>Priority</th>
            <th>Matched</th>
            <th>Missing</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill.skill}>
              <td className="skills-table-skill">{skill.skill}</td>

              <td className="skills-table-percentage">
                {skill.missingPercentage}%
              </td>

              <td>
                <Badge variant="secondary">{skill.proficiency}</Badge>
              </td>

              <td>
                {skill.priority === "High" ? (
                  <Badge variant="destructive">High</Badge>
                ) : skill.priority === "Medium" ? (
                  <Badge>Medium</Badge>
                ) : (
                  <Badge variant="outline">Low</Badge>
                )}
              </td>

              <td>
                <span className="skills-count skills-count-matched">
                  <BadgeCheck className="skills-count-icon" />
                  {skill.matchedCount}
                </span>
              </td>

              <td>
                <span className="skills-count skills-count-missing">
                  <CircleAlert className="skills-count-icon" />
                  {skill.missingCount}
                </span>
              </td>

              <td>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/analysis/${skill.matchedIn[0]?.analysisId || skill.missingIn[0]?.analysisId}`,
                    )
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { Trophy, CalendarDays, Medal } from "lucide-react";

import { Achievement } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableTextarea from "../editable/EditableTextarea";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  achievements: Achievement[];
  editing: boolean;
  onChange: (achievements: Achievement[]) => void;
}

export default function AchievementsSection({
  achievements,
  editing,
  onChange,
}: Props) {
  if (!achievements || achievements.length === 0) return null;

  function updateAchievement(
    index: number,
    field: keyof Achievement,
    value: string
  ) {
    const updated = [...achievements];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Achievements" />

      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="rounded-lg border p-5 space-y-5"
        >
          {/* Header */}

          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-3">
              {/* Title */}

              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-500" />

                <EditableInput
                  editing={editing}
                  value={achievement.title}
                  placeholder="Achievement Title"
                  className="text-xl font-semibold"
                  onChange={(value) =>
                    updateAchievement(index, "title", value)
                  }
                />
              </div>

              {/* Type */}

              {editing ? (
                <EditableInput
                  editing={editing}
                  value={achievement.type}
                  placeholder="Achievement Type"
                  onChange={(value) =>
                    updateAchievement(index, "type", value)
                  }
                />
              ) : (
                achievement.type && (
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                    <Medal className="h-4 w-4" />

                    {achievement.type}
                  </div>
                )
              )}
            </div>

            {/* Year */}

            {editing ? (
              <EditableInput
                editing={editing}
                value={achievement.year}
                placeholder="Year"
                className="w-32"
                onChange={(value) =>
                  updateAchievement(index, "year", value)
                }
              />
            ) : (
              achievement.year && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4" />

                  {achievement.year}
                </div>
              )
            )}
          </div>

          {/* Description */}

          <EditableTextarea
            editing={editing}
            value={achievement.description}
            placeholder="Achievement Description"
            rows={5}
            onChange={(value) =>
              updateAchievement(index, "description", value)
            }
          />
        </div>
      ))}
    </section>
  );
}
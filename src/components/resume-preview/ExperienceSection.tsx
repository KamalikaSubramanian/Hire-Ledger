"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { Experience } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableTextarea from "../editable/EditableTextarea";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  experience: Experience[];
  editing: boolean;
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceSection({
  experience,
  editing,
  onChange,
}: Props) {
  if (!experience || experience.length === 0) return null;

  function updateJob(
    index: number,
    field: keyof Experience,
    value: any
  ) {
    const updated = [...experience];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Professional Experience" />

      {experience.map((job, index) => (
        <div
          key={index}
          className="space-y-5 rounded-lg border p-5"
        >
          {/* Job Title */}

          <EditableInput
            editing={editing}
            value={job.jobTitle}
            placeholder="Job Title"
            className="text-xl font-semibold"
            onChange={(value) =>
              updateJob(index, "jobTitle", value)
            }
          />

          {/* Organization */}

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={job.organization}
              placeholder="Organization"
              className="text-muted-foreground"
              onChange={(value) =>
                updateJob(index, "organization", value)
              }
            />
          </div>

          {/* Location */}

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={job.location}
              placeholder="Location"
              className="text-muted-foreground"
              onChange={(value) =>
                updateJob(index, "location", value)
              }
            />
          </div>

          {/* Duration */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={job.duration}
              placeholder="Duration"
              className="text-muted-foreground"
              onChange={(value) =>
                updateJob(index, "duration", value)
              }
            />
          </div>

          {/* Employment Type */}

          <EditableInput
            editing={editing}
            value={job.employmentType}
            placeholder="Employment Type"
            onChange={(value) =>
              updateJob(index, "employmentType", value)
            }
          />

          {/* Responsibilities */}

          <div>
            <h4 className="mb-2 font-semibold">
              Responsibilities
            </h4>

            <EditableTextarea
              editing={editing}
              rows={6}
              value={job.responsibilities.join("\n")}
              onChange={(value) =>
                updateJob(
                  index,
                  "responsibilities",
                  value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>

          {/* Achievements */}

          <div>
            <h4 className="mb-2 font-semibold">
              Key Achievements
            </h4>

            <EditableTextarea
              editing={editing}
              rows={5}
              value={job.achievements.join("\n")}
              onChange={(value) =>
                updateJob(
                  index,
                  "achievements",
                  value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}
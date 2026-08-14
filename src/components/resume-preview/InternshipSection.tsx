"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { Internship } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  internships: Internship[];
  editing: boolean;
  onChange: (internships: Internship[]) => void;
}

export default function InternshipSection({
  internships,
  editing,
  onChange,
}: Props) {
  if (!internships || internships.length === 0) return null;

  function updateInternship(
    index: number,
    field: keyof Internship,
    value: any
  ) {
    const updated = [...internships];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Internships" />

      {internships.map((internship, index) => (
        <div
          key={index}
          className="space-y-5 rounded-lg border p-5"
        >
          {/* Role */}

          <EditableInput
            editing={editing}
            value={internship.role}
            placeholder="Internship Role"
            className="text-xl font-semibold"
            onChange={(value) =>
              updateInternship(index, "role", value)
            }
          />

          {/* Organization */}

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={internship.organization}
              placeholder="Organization"
              className="text-muted-foreground"
              onChange={(value) =>
                updateInternship(index, "organization", value)
              }
            />
          </div>

          {/* Duration */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={internship.duration}
              placeholder="Duration"
              className="text-muted-foreground"
              onChange={(value) =>
                updateInternship(index, "duration", value)
              }
            />
          </div>

          {/* Responsibilities */}

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-5 w-5 text-primary" />

              Responsibilities
            </h4>

            <EditableBadgeList
              editing={editing}
              values={internship.responsibilities}
              onChange={(values) =>
                updateInternship(
                  index,
                  "responsibilities",
                  values
                )
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}
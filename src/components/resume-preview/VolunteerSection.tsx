"use client";

import {
  HandHeart,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { VolunteerExperience } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  volunteer: VolunteerExperience[];
  editing: boolean;
  onChange: (volunteer: VolunteerExperience[]) => void;
}

export default function VolunteerSection({
  volunteer,
  editing,
  onChange,
}: Props) {
  if (!volunteer || volunteer.length === 0) return null;

  function updateVolunteer(
    index: number,
    field: keyof VolunteerExperience,
    value: any
  ) {
    const updated = [...volunteer];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Volunteer Experience" />

      {volunteer.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border p-5 space-y-5"
        >
          {/* Role */}

          <div className="flex items-center gap-3">
            <HandHeart className="text-primary h-5 w-5" />

            <EditableInput
              editing={editing}
              value={item.role}
              placeholder="Volunteer Role"
              className="text-xl font-semibold"
              onChange={(value) =>
                updateVolunteer(index, "role", value)
              }
            />
          </div>

          {/* Organization */}

          <EditableInput
            editing={editing}
            value={item.organization}
            placeholder="Organization"
            className="text-muted-foreground"
            onChange={(value) =>
              updateVolunteer(index, "organization", value)
            }
          />

          {/* Duration */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={item.duration}
              placeholder="Duration"
              onChange={(value) =>
                updateVolunteer(index, "duration", value)
              }
            />
          </div>

          {/* Responsibilities */}

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Responsibilities
            </h4>

            <EditableBadgeList
              editing={editing}
              values={item.responsibilities}
              onChange={(values) =>
                updateVolunteer(
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
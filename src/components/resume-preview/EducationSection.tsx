"use client";

import {
  GraduationCap,
  MapPin,
  CalendarDays,
  BookOpen,
  Award,
} from "lucide-react";

import { Education } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableTextarea from "../editable/EditableTextarea";
import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  education: Education[];
  editing: boolean;
  onChange: (education: Education[]) => void;
}

export default function EducationSection({
  education,
  editing,
  onChange,
}: Props) {
  if (!education || education.length === 0) return null;

  function updateEducation(
    index: number,
    field: keyof Education,
    value: any
  ) {
    const updated = [...education];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Education" />

      {education.map((item, index) => (
        <div
          key={index}
          className="space-y-5 rounded-lg border p-5"
        >
          {/* Degree */}

          <EditableInput
            editing={editing}
            value={item.degree}
            placeholder="Degree"
            className="text-xl font-semibold"
            onChange={(value) =>
              updateEducation(index, "degree", value)
            }
          />

          {/* Institution */}

          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={item.institution}
              placeholder="Institution"
              className="text-muted-foreground"
              onChange={(value) =>
                updateEducation(index, "institution", value)
              }
            />
          </div>

          {/* Location */}

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={item.location}
              placeholder="Location"
              className="text-muted-foreground"
              onChange={(value) =>
                updateEducation(index, "location", value)
              }
            />
          </div>

          {/* Year */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={item.year}
              placeholder="Year"
              className="text-muted-foreground"
              onChange={(value) =>
                updateEducation(index, "year", value)
              }
            />
          </div>

          {/* Grade */}

          <EditableInput
            editing={editing}
            value={item.grade}
            placeholder="CGPA / Percentage"
            onChange={(value) =>
              updateEducation(index, "grade", value)
            }
          />

          {/* Specialization */}

          <div>
            <h4 className="mb-2 flex items-center gap-2 font-semibold">
              <Award className="h-5 w-5 text-primary" />

              Specialization
            </h4>

            <EditableTextarea
              editing={editing}
              rows={3}
              value={item.specialization}
              onChange={(value) =>
                updateEducation(
                  index,
                  "specialization",
                  value
                )
              }
            />
          </div>

          {/* Coursework */}

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <BookOpen className="h-5 w-5 text-primary" />

              Relevant Coursework
            </h4>

            <EditableBadgeList
              editing={editing}
              values={item.relevantCoursework}
              onChange={(values) =>
                updateEducation(
                  index,
                  "relevantCoursework",
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
"use client";

import {
  FolderKanban,
  CalendarDays,
  Wrench,
  CheckCircle2,
} from "lucide-react";

import { Project } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableTextarea from "../editable/EditableTextarea";
import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  projects: Project[];
  editing: boolean;
  onChange: (projects: Project[]) => void;
}

export default function ProjectsSection({
  projects,
  editing,
  onChange,
}: Props) {
  if (!projects || projects.length === 0) return null;

  function updateProject(
    index: number,
    field: keyof Project,
    value: any
  ) {
    const updated = [...projects];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Projects" />

      {projects.map((project, index) => (
        <div
          key={index}
          className="space-y-5 rounded-lg border p-5"
        >
          {/* Title */}

          <EditableInput
            editing={editing}
            value={project.title}
            placeholder="Project Title"
            className="text-xl font-semibold"
            onChange={(value) =>
              updateProject(index, "title", value)
            }
          />

          {/* Role */}

          <EditableInput
            editing={editing}
            value={project.role}
            placeholder="Role"
            className="text-primary font-medium"
            onChange={(value) =>
              updateProject(index, "role", value)
            }
          />

          {/* Duration */}

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <EditableInput
              editing={editing}
              value={project.duration}
              placeholder="Duration"
              className="text-muted-foreground"
              onChange={(value) =>
                updateProject(index, "duration", value)
              }
            />
          </div>

          {/* Description */}

          <EditableTextarea
            editing={editing}
            value={project.description}
            rows={5}
            onChange={(value) =>
              updateProject(index, "description", value)
            }
          />

          {/* Responsibilities */}

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <FolderKanban className="h-5 w-5 text-primary" />

              Responsibilities
            </h4>

            {editing ? (
              <EditableTextarea
                editing
                rows={6}
                value={project.responsibilities.join("\n")}
                onChange={(value) =>
                  updateProject(
                    index,
                    "responsibilities",
                    value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  )
                }
              />
            ) : (
              <ul className="space-y-2">
                {project.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />

                    <span className="leading-7 text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tools */}

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <Wrench className="h-5 w-5 text-primary" />

              Tools Used
            </h4>

            <EditableBadgeList
              editing={editing}
              values={project.toolsUsed}
              onChange={(values) =>
                updateProject(index, "toolsUsed", values)
              }
            />
          </div>

          {/* Outcome */}

          <div>
            <h4 className="mb-2 font-semibold">
              Outcome
            </h4>

            <EditableTextarea
              editing={editing}
              rows={4}
              value={project.outcome}
              onChange={(value) =>
                updateProject(index, "outcome", value)
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}
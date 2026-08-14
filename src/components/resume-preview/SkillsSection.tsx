"use client";

import { Skills } from "@/types/newResume";

import EditableBadgeList from "../editable/EditableBadgeList";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  skills: Skills;
  editing: boolean;
  onChange: (skills: Skills) => void;
}

export default function SkillsSection({
  skills,
  editing,
  onChange,
}: Props) {
  const categories = [
    {
      key: "technical",
      title: "Technical Skills",
      values: skills.technical,
    },
    {
      key: "professional",
      title: "Professional Skills",
      values: skills.professional,
    },
    {
      key: "applications",
      title: "Applications",
      values: skills.applications,
    },
    {
      key: "tools",
      title: "Tools",
      values: skills.tools,
    },
    {
      key: "languages",
      title: "Languages",
      values: skills.languages,
    },
    {
      key: "other",
      title: "Other Skills",
      values: skills.other,
    },
  ] as const;

  const availableCategories = categories.filter(
    (category) =>
      category.values &&
      category.values.length > 0
  );

  if (availableCategories.length === 0) return null;

  function updateCategory(
    category: keyof Skills,
    values: string[]
  ) {
    onChange({
      ...skills,
      [category]: values,
    });
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Skills" />

      {availableCategories.map((category) => (
        <div key={category.key}>
          <h3 className="text-muted-foreground mb-3 text-sm font-semibold uppercase tracking-wide">
            {category.title}
          </h3>

          <EditableBadgeList
            editing={editing}
            values={category.values}
            onChange={(values) =>
              updateCategory(category.key, values)
            }
          />
        </div>
      ))}
    </section>
  );
}
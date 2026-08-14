"use client";

import { Languages } from "lucide-react";

import { Language } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  languages: Language[];
  editing: boolean;
  onChange: (languages: Language[]) => void;
}

export default function LanguagesSection({
  languages,
  editing,
  onChange,
}: Props) {
  if (!languages || languages.length === 0) return null;

  function updateLanguage(
    index: number,
    field: keyof Language,
    value: string
  ) {
    const updated = [...languages];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  function getBadgeColor(proficiency: string) {
    switch (proficiency.toLowerCase()) {
      case "native":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "professional":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      case "advanced":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";

      case "intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      default:
        return "bg-muted text-muted-foreground";
    }
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Languages" />

      <div className="grid gap-8 md:grid-cols-2">
        {languages.map((language, index) => (
          <div
            key={index}
            className="space-y-3 rounded-lg border p-8"
          >
            {/* Language */}

            <div className="flex items-center gap-3">
              <Languages className="text-primary h-5 w-5" />

              <EditableInput
                editing={editing}
                value={language.language}
                placeholder="Language"
                className="font-medium"
                onChange={(value) =>
                  updateLanguage(index, "language", value)
                }
              />
            </div>

            {/* Proficiency */}

            {editing ? (
              <EditableInput
                editing={editing}
                value={language.proficiency}
                placeholder="Proficiency"
                onChange={(value) =>
                  updateLanguage(index, "proficiency", value)
                }
              />
            ) : (
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getBadgeColor(
                  language.proficiency
                )}`}
              >
                {language.proficiency}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
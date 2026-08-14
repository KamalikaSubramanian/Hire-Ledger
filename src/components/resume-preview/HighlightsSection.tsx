"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

import { ProfessionalHighlight } from "@/types/newResume";

import EditableInput from "../editable/EditableInput";
import EditableTextarea from "../editable/EditableTextarea";
import EditableSectionTitle from "../editable/EditableSectionTitle";

interface Props {
  highlights: ProfessionalHighlight[];
  editing: boolean;
  onChange: (highlights: ProfessionalHighlight[]) => void;
}

export default function HighlightsSection({
  highlights,
  editing,
  onChange,
}: Props) {
  if (!highlights || highlights.length === 0) return null;

  function updateHighlight(
    index: number,
    field: keyof ProfessionalHighlight,
    value: string
  ) {
    const updated = [...highlights];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  }

  return (
    <section className="space-y-6">
      <EditableSectionTitle title="Professional Highlights" />

      <div className="grid gap-5 md:grid-cols-2">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="bg-primary/5 rounded-2xl border p-5 transition-all hover:shadow-md"
          >
            {/* Title */}

            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Sparkles className="text-primary h-5 w-5" />
              </div>

              <EditableInput
                editing={editing}
                value={highlight.title}
                placeholder="Highlight Title"
                className="text-lg font-semibold"
                onChange={(value) =>
                  updateHighlight(index, "title", value)
                }
              />
            </div>

            {/* Description */}

            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />

              <div className="flex-1">
                <EditableTextarea
                  editing={editing}
                  value={highlight.description}
                  placeholder="Highlight Description"
                  rows={4}
                  onChange={(value) =>
                    updateHighlight(index, "description", value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
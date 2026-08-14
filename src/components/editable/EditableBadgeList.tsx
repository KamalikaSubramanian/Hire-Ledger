"use client";

import { Textarea } from "@/components/ui/textarea";

interface Props {
  editing: boolean;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function EditableBadgeList({
  editing,
  values,
  onChange,
}: Props) {
  if (!editing) {
    return (
      <div className="flex flex-wrap gap-2">
        {values.map((item,index) => (
          <span
            key={`${item}-${index}`}
            className="bg-muted rounded-md border px-3 py-1 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <Textarea
      rows={6}
      value={values.join("\n")}
      placeholder="One item per line"
      onChange={(e) =>
        onChange(
          e.target.value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      }
    />
  );
}
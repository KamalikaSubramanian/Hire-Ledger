"use client";

import EditableSectionTitle from "../editable/EditableSectionTitle";
import EditableTextarea from "../editable/EditableTextarea";

interface Props {
  summary: string;
  editing: boolean;
  onChange: (value: string) => void;
}

export default function SummarySection({
  summary,
  editing,
  onChange,
}: Props) {
  if (!summary) return null;

  return (
    <section className="space-y-4">
      <EditableSectionTitle title="Professional Summary" />

      <EditableTextarea
        editing={editing}
        value={summary}
        rows={5}
        onChange={onChange}
      />
    </section>
  );
}
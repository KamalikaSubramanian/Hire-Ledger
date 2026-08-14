"use client";

import EditableSectionTitle from "../editable/EditableSectionTitle";
import EditableTextarea from "../editable/EditableTextarea";

interface Props {
  careerObjective: string;
  editing: boolean;
  onChange: (value: string) => void;
}

export default function CareerObjectiveSection({
  careerObjective,
  editing,
  onChange,
}: Props) {
  if (!careerObjective) return null;

  return (
    <section className="space-y-4">
      <EditableSectionTitle title="Career Objective" />

      <EditableTextarea
        editing={editing}
        value={careerObjective}
        rows={5}
        onChange={onChange}
      />
    </section>
  );
}
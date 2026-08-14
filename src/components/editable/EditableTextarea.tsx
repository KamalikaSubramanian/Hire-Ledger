"use client";

import { Textarea } from "@/components/ui/textarea";

interface Props {
  editing: boolean;
  value: string;
  rows?: number;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function EditableTextarea({
  editing,
  value,
  rows = 4,
  placeholder,
  className,
  onChange,
}: Props) {
  if (!editing) {
    return (
      <p className={className}>
        {value}
      </p>
    );
  }

  return (
    <Textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
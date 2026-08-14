"use client";

import { Input } from "@/components/ui/input";

interface Props {
  editing: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function EditableInput({
  editing,
  value,
  onChange,
  placeholder,
  className,
}: Props) {

  if (!editing) {
    return (
      <div className={className}>
        {value}
      </div>
    );
  }

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className={className}
    />
  );
}
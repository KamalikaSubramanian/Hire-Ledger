"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AnalysisSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="analysis-search-card">

      <div className="analysis-search-wrapper">

        <Search className="analysis-search-icon" />

        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by company or job title..."
          className="analysis-search-input"
        />

      </div>

    </div>
  );
}
"use client";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  company: string;
  score: string;
  date: string;
  sort: string;

  onCompanyChange: (v: string) => void;
  onScoreChange: (v: string) => void;
  onDateChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

export default function AnalysisFilters({
  company,
  score,
  date,
  sort,
  onCompanyChange,
  onScoreChange,
  onDateChange,
  onSortChange,
}: Props) {
  return (
    <div className="analysis-filters">
      {/* Company */}
      <Input
        className="analysis-filter-input"
        placeholder="Company"
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
      />

      {/* Match Score */}
      <Select
        value={score}
        onValueChange={(value) => onScoreChange(value ?? "")}
      >
        <SelectTrigger className="analysis-filter-trigger">
          <SelectValue placeholder="Match Score" />
        </SelectTrigger>

        <SelectContent className="analysis-select-content">
          <SelectItem value="all">All Scores</SelectItem>

          <SelectItem value="0-50">0 - 50%</SelectItem>

          <SelectItem value="50-70">50 - 70%</SelectItem>

          <SelectItem value="70-90">70 - 90%</SelectItem>

          <SelectItem value="90-100">90%+</SelectItem>
        </SelectContent>
      </Select>

      {/* Date */}
      <Input
        type="date"
        className="analysis-filter-input"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      />

      {/* Sort */}
      <Select
        value={sort}
        onValueChange={(value) => onSortChange(value ?? "latest")}
      >
        <SelectTrigger className="analysis-filter-trigger">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent className="analysis-select-content">
          <SelectItem value="latest">Latest</SelectItem>

          <SelectItem value="oldest">Oldest</SelectItem>

          <SelectItem value="highest">Highest Score</SelectItem>

          <SelectItem value="lowest">Lowest Score</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

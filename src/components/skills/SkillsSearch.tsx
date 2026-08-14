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
  search: string;
  sort: string;

  onSearch: (v: string) => void;
  onSort: (v: string) => void;
}

export default function SkillsSearch({
  search,
  sort,
  onSearch,
  onSort,
}: Props) {
  return (
    <div className="skills-search-wrapper">
      {/* Search */}
      <div className="skills-search-field">
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="skills-search-input"
        />
      </div>

      {/* Sort */}
      <div className="skills-sort-field">
        <Select
          value={sort}
          onValueChange={(value) => onSort(value ?? "highest")}
        >
          <SelectTrigger className="skills-sort-trigger">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent
            className="skills-select-content"
            sideOffset={6}
          >
            <SelectItem
              value="highest"
              className="skills-select-item"
            >
              Highest Missing %
            </SelectItem>

            <SelectItem
              value="lowest"
              className="skills-select-item"
            >
              Lowest Missing %
            </SelectItem>

            <SelectItem
              value="az"
              className="skills-select-item"
            >
              A → Z
            </SelectItem>

            <SelectItem
              value="za"
              className="skills-select-item"
            >
              Z → A
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
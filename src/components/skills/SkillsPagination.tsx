"use client";

import { Button } from "@/components/ui/button";

interface Props {
  pagination: {
    page: number;

    totalPages: number;

    totalItems: number;
  };

  onPageChange: (page: number) => void;
}

export default function SkillsPagination({ pagination, onPageChange }: Props) {
  return (
    <div className="skills-pagination">
      <span className="skills-pagination-info">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <div className="skills-pagination-buttons">
        <Button
          variant="outline"
          disabled={pagination.page === 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>

        <Button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

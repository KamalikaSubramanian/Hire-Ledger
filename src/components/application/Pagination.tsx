"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function goToPage(page: number) {
    const query = new URLSearchParams(params.toString());

    query.set("page", page.toString());

    router.push(`/applications?${query.toString()}`);
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex gap-2">
        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((page) => (
          <Button
            key={page}
            variant={
              page === currentPage
                ? "default"
                : "outline"
            }
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
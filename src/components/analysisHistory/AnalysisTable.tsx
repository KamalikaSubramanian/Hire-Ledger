"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface PaginationData {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface Props {
  analyses: any[];
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}

export default function AnalysisTable({
  analyses,
  pagination,
  onPageChange,
}: Props) {
  const router = useRouter();

  const [selectedJobDescription, setSelectedJobDescription] = useState<
    string | null
  >(null);

  function getShortDescription(description: string) {
    const words = description.trim().split(/\s+/);

    if (words.length <= 3) {
      return description;
    }

    return words.slice(0, 3).join(" ") + "...";
  }

  if (analyses.length === 0) {
    return (
      <div className="analysis-empty-card">
        <h2 className="analysis-empty-title">No Analysis Found</h2>

        <p className="analysis-empty-description">
          Upload a resume to start your first analysis.
        </p>
      </div>
    );
  }

  function getScoreClass(score: number) {
    if (score >= 70) {
      return "analysis-score-high";
    }

    if (score >= 50) {
      return "analysis-score-medium";
    }

    return "analysis-score-low";
  }

  return (
    <>
      <div className="analysis-table-card">
        <div className="analysis-table-wrapper">
          <table className="analysis-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Resume</th>
                <th>Job Description</th>
                <th>ATS Score</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {analyses.map((analysis) => {
                const score =
                  analysis.analysisResult?.atsAnalysis?.atsScore ?? 0;

                const jobDescription =
                  analysis.jobDescription || "No job description available.";

                // Show only first 3 words
                const descriptionPreview = jobDescription
                  .split(/\s+/)
                  .slice(0, 3)
                  .join(" ");

                return (
                  <tr key={analysis._id}>
                    {/* JOB TITLE */}
                    <td>
                      <span className="analysis-job-title">
                        {analysis.jobTitle}
                      </span>
                    </td>

                    {/* COMPANY */}
                    <td>
                      <span className="analysis-company">
                        {analysis.company || "—"}
                      </span>
                    </td>

                    <td>
                      {analysis.resumeId ? (
                        <button
                          type="button"
                          className="analysis-resume-link"
                          onClick={(e) => {
                            e.stopPropagation();

                            router.push(
                              `/resume-library/view/${analysis.resumeId}`,
                            );
                          }}
                        >
                          {analysis.resumeName || "View Resume"}
                        </button>
                      ) : (
                        <span className="analysis-resume-missing">
                          No resume
                        </span>
                      )}
                    </td>

                    {/* JOB DESCRIPTION */}
                    <td>
                      <div className="analysis-description-preview">
                        <span>
                          {descriptionPreview}
                          {jobDescription.split(/\s+/).length > 3 && "..."}
                        </span>

                        <button
                          type="button"
                          className="analysis-description-more"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJobDescription(analysis.jobDescription);
                          }}
                          aria-label="View full job description"
                        >
                          ...
                        </button>
                      </div>
                    </td>

                    {/* ATS SCORE */}
                    <td>
                      <span
                        className={`analysis-score-badge ${getScoreClass(score)}`}
                      >
                        {score}%
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      <span className="analysis-date">
                        {new Date(analysis.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>
                      <Button
                        variant="outline"
                        size="sm"
                        className="analysis-view-button"
                        onClick={(e) => {
                          e.stopPropagation();

                          router.push(`/analysis/${analysis._id}`);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        {pagination.totalItems > 0 && (
          <div className="analysis-pagination">
            <div className="analysis-pagination-info">
              Showing {(pagination.page - 1) * pagination.limit + 1}
              {" - "}
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalItems,
              )}
              {" of "}
              {pagination.totalItems}
            </div>

            <div className="analysis-pagination-controls">
              <button
                type="button"
                className="analysis-pagination-button"
                disabled={pagination.page === 1}
                onClick={() => onPageChange(pagination.page - 1)}
              >
                Previous
              </button>

              <div className="analysis-pagination-pages">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`analysis-pagination-page ${
                      pagination.page === pageNumber
                        ? "analysis-pagination-page-active"
                        : ""
                    }`}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="analysis-pagination-button"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Dialog
        open={selectedJobDescription !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedJobDescription(null);
          }
        }}
      >
        <DialogContent className="analysis-description-dialog">
          <DialogHeader>
            <DialogTitle>Job Description</DialogTitle>
          </DialogHeader>

          <div className="analysis-description-content">
            {selectedJobDescription}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

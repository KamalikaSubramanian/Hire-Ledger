"use client";

import { CalendarDays, FileText, MapPin, Eye, Download } from "lucide-react";

import { AnalysisDocument } from "@/types/analysis";

import { getImprovedResume } from "@/actions/improvedResume.actions";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

interface Props {
  analysis: AnalysisDocument;
}

export default function AnalysisHeader({ analysis }: Props) {
  const router = useRouter();

  const [improvedResume, setImprovedResume] = useState<any>(null);

  useEffect(() => {
    async function loadResume() {
      const result = await getImprovedResume(analysis._id);

      if (result.success) {
        setImprovedResume(result.data);
      }
    }

    loadResume();
  }, [analysis._id]);

  const downloadResume = async () => {
    try {
      const response = await fetch(analysis.resumeUrl);

      if (!response.ok) {
        throw new Error("Unable to download resume");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = analysis.resumeName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="analysis-header">
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="analysis-header-main">
        {/* ===================================================
            JOB INFORMATION
        =================================================== */}

        <div className="analysis-header-info">
          <span className="analysis-header-eyebrow">RESUME ANALYSIS</span>

          <h1 className="analysis-header-company">{analysis.company}</h1>

          <p className="analysis-header-job-title">{analysis.jobTitle}</p>

          <div className="analysis-header-meta">
            <div className="analysis-header-meta-item">
              <MapPin />

              <span>{analysis.location}</span>
            </div>

            <div className="analysis-header-meta-item">
              <CalendarDays />

              <span>
                {new Date(analysis.analyzedAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            RESUME CARDS
        =================================================== */}

        <div className="analysis-header-resumes">
          {/* =================================================
              ORIGINAL RESUME
          ================================================= */}

          <div className="analysis-resume-card">
            <div className="analysis-resume-card-top">
              <div className="analysis-resume-icon">
                <FileText />
              </div>

              <div className="analysis-resume-info">
                <span className="analysis-resume-label">Resume Used</span>

                <span className="analysis-resume-name">
                  {analysis.resumeName}
                </span>
              </div>
            </div>

            <div className="analysis-resume-actions">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="analysis-outline-button"
                onClick={() =>
                  router.push(`/resume-library/view/${analysis.resumeId}`)
                }
              >
                <Eye />
                View
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="analysis-outline-button"
                onClick={downloadResume}
              >
                <Download />
                Download
              </Button>
            </div>
          </div>

          {/* =================================================
              IMPROVED RESUME
          ================================================= */}

          {improvedResume && (
            <div className="analysis-resume-card analysis-improved-resume">
              <div className="analysis-resume-card-top">
                <div className="analysis-resume-icon analysis-improved-icon">
                  <FileText />
                </div>

                <div className="analysis-resume-info">
                  <span className="analysis-resume-label">Improved Resume</span>

                  <span className="analysis-resume-name">
                    ATS Optimized Resume
                  </span>
                </div>
              </div>

              <div className="analysis-resume-actions">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="analysis-outline-button"
                  onClick={() =>
                    router.push(`/analysis/${analysis._id}/improved-resume`)
                  }
                >
                  <Eye />
                  View
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="analysis-outline-button"
                  onClick={() =>
                    router.push(`/analysis/${analysis._id}/improved-resume`)
                  }
                >
                  <Download />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

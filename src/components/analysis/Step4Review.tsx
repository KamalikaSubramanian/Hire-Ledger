"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";

import { useAnalysisStore } from "@/store/analysisStore";

import { analyzeResume } from "@/actions/analysis.actions";
import { getApplicationById } from "@/actions/application.actions";

import { toast } from "sonner";


export default function Step4Review() {
  const router = useRouter();

  const {
    company,
    jobTitle,
    location,
    appliedDate,
    status,

    selectedResumeName,
    selectedResumeUrl,
    selectedResumeId,

    jobDescription,

    previousStep,
    applicationId,

    setApplication,
    reset,
    setAnalyzing,
    isAnalyzing,
  } = useAnalysisStore();


  useEffect(() => {
    async function loadApplication() {
      if (!applicationId) return;

      try {
        const response = await getApplicationById(applicationId);

        if (!response.success) {
          toast.error(response.message);
          return;
        }

        const application = response.data;

        setApplication({
          applicationId: application._id,
          company: application.company,
          jobTitle: application.jobTitle,
          location: application.location,
          appliedDate: application.appliedDate,
          status: application.status,
          jobDescription: application.jobDescription,
        });
      } catch (error) {
        console.error(error);

        toast.error("Unable to load application information.");
      }
    }

    loadApplication();
  }, [applicationId, setApplication]);


  async function handleAnalyze() {
    if (!applicationId) {
      toast.error("Application not found.");
      return;
    }

    if (!selectedResumeId) {
      toast.error("Please select a resume.");
      return;
    }

    if (!jobDescription) {
      toast.error("Job description is missing.");
      return;
    }

    try {
      setAnalyzing(true);

      const response = await analyzeResume(applicationId);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      const analysisId = response.data._id.toString();

      toast.success("Analysis completed successfully.");

      reset();

      router.push(`/analysis/${analysisId}`);
    } catch (error) {
      console.error(error);

      toast.error("Unable to analyze resume.");
    } finally {
      setAnalyzing(false);
    }
  }


  async function downloadResume() {
    try {
      if (!selectedResumeUrl) {
        toast.error("Resume URL not available.");

        return;
      }

      const response = await fetch(selectedResumeUrl);

      if (!response.ok) {
        throw new Error("Unable to download resume.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = selectedResumeName || "Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      toast.error("Unable to download resume.");
    }
  }


  return (
    <Card className="page-card analysis-review-card">
      <CardHeader className="analysis-card-header">
        <div className="analysis-review-heading">
          <div className="analysis-review-icon">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <CardTitle className="analysis-card-title">
              Review Analysis
            </CardTitle>

            <CardDescription className="analysis-card-description">
              Verify everything before running your AI resume analysis.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="analysis-review-content">

        <section className="analysis-review-section">
          <div className="analysis-review-section-header">
            <div className="analysis-review-section-icon">
              <Building2 size={19} />
            </div>

            <div>
              <h3>Application Details</h3>

              <p>Information about the position you're applying for.</p>
            </div>
          </div>

          <div className="analysis-info-grid">
            <Info
              icon={<Building2 size={17} />}
              label="Company"
              value={company || "-"}
            />

            <Info
              icon={<Briefcase size={17} />}
              label="Job Title"
              value={jobTitle || "-"}
            />

            <Info
              icon={<MapPin size={17} />}
              label="Location"
              value={location || "-"}
            />

            <Info
              icon={<CheckCircle2 size={17} />}
              label="Status"
              value={status || "-"}
            />

            <Info
              icon={<Calendar size={17} />}
              label="Applied Date"
              value={
                appliedDate
                  ? new Date(appliedDate).toLocaleDateString("en-GB")
                  : "-"
              }
            />
          </div>
        </section>

        <section className="analysis-review-section">
          <div className="analysis-review-section-header">
            <div className="analysis-review-section-icon">
              <FileText size={19} />
            </div>

            <div>
              <h3>Selected Resume</h3>

              <p>This resume will be used for the AI analysis.</p>
            </div>
          </div>

          <div className="analysis-resume-review">
            <div className="analysis-resume-file">
              <div className="analysis-resume-file-icon">
                <FileText size={22} />
              </div>

              <div>
                <p className="analysis-resume-name">
                  {selectedResumeName || "No Resume Selected"}
                </p>

                <p className="analysis-resume-description">Selected resume</p>
              </div>
            </div>

            {selectedResumeId && (
              <div className="analysis-resume-actions">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push(`/resume-library/view/${selectedResumeId}`)
                  }
                  className="analysis-secondary-button"
                >
                  View
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={downloadResume}
                  className="analysis-secondary-button"
                >
                  Download
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="analysis-review-section">
          <div className="analysis-review-section-header">
            <div className="analysis-review-section-icon">
              <Briefcase size={19} />
            </div>

            <div>
              <h3>Job Description</h3>

              <p>
                The job requirements that will be compared with your resume.
              </p>
            </div>
          </div>

          <div className="analysis-job-meta">
            <span>
              {jobDescription?.length?.toLocaleString() || 0} characters
            </span>
          </div>

          <div className="analysis-job-preview">
            <pre>{jobDescription || "No job description provided."}</pre>
          </div>
        </section>


        <section className="analysis-ai-info">
          <div className="analysis-ai-header">
            <div className="analysis-ai-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h3>AI Analysis</h3>

              <p>Here's what Hire Ledger will analyze for you.</p>
            </div>
          </div>

          <div className="analysis-ai-grid">
            <AnalysisPoint text="Resume content and skills" />

            <AnalysisPoint text="Job description requirements" />

            <AnalysisPoint text="Resume-to-job match score" />

            <AnalysisPoint text="Missing skills" />

            <AnalysisPoint text="Matching skills" />

            <AnalysisPoint text="Resume strengths" />

            <AnalysisPoint text="Personalized improvement suggestions" />
          </div>

          <div className="analysis-estimated-time">
            <span>Estimated analysis time</span>

            <strong>10–20 seconds</strong>
          </div>
        </section>

        <div className="analysis-review-actions">
          <Button
            type="button"
            variant="outline"
            disabled={isAnalyzing}
            onClick={previousStep}
            className="analysis-back-button"
          >
            ← Back
          </Button>

          <Button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="analysis-analyze-button"
          >
            <Sparkles
              size={17}
              className={isAnalyzing ? "animate-pulse" : ""}
            />

            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


interface InfoProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function Info({ icon, label, value }: InfoProps) {
  return (
    <div className="analysis-info-item">
      <div className="analysis-info-label">
        {icon}

        <span>{label}</span>
      </div>

      <p>{value}</p>
    </div>
  );
}


function AnalysisPoint({ text }: { text: string }) {
  return (
    <div className="analysis-ai-point">
      <CheckCircle2 size={17} />

      <span>{text}</span>
    </div>
  );
}

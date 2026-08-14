"use client";

import { useEffect, useState } from "react";

import {
  getUserResumes,
} from "@/actions/resume.actions";

import {
  updateApplicationResume,
} from "@/actions/application.actions";

import {
  useAnalysisStore,
} from "@/store/analysisStore";

import ResumeUpload from "../resume/ResumeUpload";

import ResumeSelectionCard from "../resume/ResumeSelectionCard";

import { Button } from "@/components/ui/button";

import { Resume } from "@/types/resume";

import { toast } from "sonner";

export default function Step2Resume() {
  const nextStep = useAnalysisStore(
    (state) => state.nextStep
  );

  const previousStep = useAnalysisStore(
    (state) => state.previousStep
  );

  const applicationId = useAnalysisStore(
    (state) => state.applicationId
  );

  const setResume = useAnalysisStore(
    (state) => state.setResume
  );

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedResume, setSelectedResume] =
    useState<Resume | null>(null);


  async function fetchResumes() {
    try {
      setLoading(true);

      const response = await getUserResumes();

      if (response.success && response.data) {
        setResumes(response.data);
      } else {
        setResumes([]);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load your resumes."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResumes();
  }, []);



  function handleResumeSelect(resume: Resume) {
    setSelectedResume(resume);

    setResume({
      selectedResumeId: resume._id,
      selectedResumeName: resume.fileName,
      selectedResumeUrl: resume.url,
    });
  }



  async function handleNext() {
    if (!selectedResume) {
      toast.error(
        "Please select or upload a resume first."
      );

      return;
    }

    if (!applicationId) {
      toast.error(
        "Application information is missing."
      );

      return;
    }

    try {
      const response =
        await updateApplicationResume(
          applicationId,
          selectedResume._id
        );

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      nextStep();
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to save the selected resume."
      );
    }
  }



  async function handleUploadSuccess(
    uploadedResume: Resume
  ) {
    await fetchResumes();

    setSelectedResume(uploadedResume);

    setResume({
      selectedResumeId: uploadedResume._id,
      selectedResumeName: uploadedResume.fileName,
      selectedResumeUrl: uploadedResume.url,
    });

    toast.success(
      "Resume uploaded successfully."
    );
  }


  if (loading) {
    return (
      <section className="analysis-resume-section">
        <div className="analysis-loading">
          <div className="analysis-loading-spinner" />

          <p>
            Loading your resumes...
          </p>
        </div>
      </section>
    );
  }


  return (
    <div className="analysis-resume-page">


      <section className="analysis-resume-section">

        <div className="analysis-section-header">
          <div>
            <span className="analysis-section-label">
              STEP 02
            </span>

            <h1 className="analysis-section-title">
              Choose Your Resume
            </h1>

            <p className="analysis-section-description">
              Select an existing resume from your
              library or upload a new one.
            </p>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="analysis-empty">
            <p>
              No resumes found in your library.
            </p>

            <span>
              Upload a new resume below to continue.
            </span>
          </div>
        ) : (
          <div className="analysis-resume-list">
            {resumes.map((resume) => (
              <ResumeSelectionCard
                key={resume._id}
                resume={resume}
                selected={
                  selectedResume?._id ===
                  resume._id
                }
                onSelect={() =>
                  handleResumeSelect(resume)
                }
              />
            ))}
          </div>
        )}
      </section>


      <section className="analysis-resume-section">

        <div className="analysis-section-header">
          <div>
            <h2 className="analysis-subsection-title">
              Upload New Resume
            </h2>

            <p className="analysis-section-description">
              Upload your latest resume to use
              for this analysis.
            </p>
          </div>
        </div>

        <div className="analysis-upload-area">
          <ResumeUpload
            onUpload={handleUploadSuccess}
          />
        </div>

      </section>


      <div className="analysis-actions">

        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          className="analysis-back-button"
        >
          ← Back
        </Button>

        <Button
          type="button"
          disabled={!selectedResume}
          onClick={handleNext}
          className="analysis-next-button"
        >
          Next →
        </Button>

      </div>

    </div>
  );
}
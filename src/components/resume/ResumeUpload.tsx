"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { uploadResume } from "@/actions/resume.actions";
import { useAnalysisStore } from "@/store/analysisStore";
import { updateApplicationResume } from "@/actions/application.actions";

import { Resume } from "@/types/resume";

interface ResumeUploadProps {
  onUpload?: (resume: Resume) => void;
}

export default function ResumeUpload({
  onUpload,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const applicationId = useAnalysisStore(
    (state) => state.applicationId
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5MB.");
      return;
    }

    setFile(selected);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a resume first.");
      return;
    }

    if (!applicationId) {
      toast.error("Application information is missing.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("resume", file);

      // 1. Upload resume
      const response = await uploadResume(formData);

      if (!response.success || !response.data) {
        toast.error(
          response.message || "Unable to upload resume."
        );

        return;
      }

      const uploadedResume = response.data;

      // 2. Associate uploaded resume with application
      const applicationResponse =
        await updateApplicationResume(
          applicationId,
          uploadedResume._id
        );

      if (!applicationResponse.success) {
        toast.error(
          applicationResponse.message ||
            "Unable to attach resume to application."
        );

        return;
      }

      // 3. Update Step 2 immediately
      if (onUpload) {
        onUpload(uploadedResume);
      }

      // 4. Clear selected file
      setFile(null);

      toast.success(
        "Resume uploaded successfully."
      );
    } catch (error) {
      console.error(
        "Resume upload error:",
        error
      );

      toast.error(
        "Unable to upload resume."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="resume-upload-card">
      <h2 className="resume-upload-title">
        Upload Resume
      </h2>

      <p className="resume-upload-description">
        Upload your latest resume in PDF format to
        analyze, track, and improve it.
      </p>

      <div
        {...getRootProps()}
        className={
          isDragActive
            ? "resume-dropzone resume-dropzone-active"
            : "resume-dropzone"
        }
      >
        <input {...getInputProps()} />

        <UploadCloud className="resume-upload-icon" />

        <p className="resume-dropzone-title">
          Drag & Drop your resume here
        </p>

        <p className="resume-dropzone-subtitle">
          or click to browse
        </p>

        <p className="resume-dropzone-info">
          PDF only • Maximum file size 5MB
        </p>
      </div>

      {file && (
        <div className="resume-selected-file">
          <div className="resume-file-info">
            <FileText className="resume-file-icon" />

            <div>
              <p className="resume-file-name">
                {file.name}
              </p>

              <p className="resume-file-size">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <Button
            type="button"
            className="resume-upload-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Upload Resume"}
          </Button>
        </div>
      )}
    </section>
  );
}
"use client";

import { Check } from "lucide-react";
import { useAnalysisStore } from "@/store/analysisStore";

const steps = [
  "Application",
  "Resume",
  "Job Description",
  "Review",
];

export default function ProgressBar() {
  const currentStep = useAnalysisStore(
    (state) => state.currentStep
  );

  const progress =
    ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <section className="analysis-progress">
      {/* Header */}
      <div className="analysis-progress-header">
        <div>
          <p className="analysis-eyebrow">
            RESUME ANALYSIS
          </p>

          <h1 className="analysis-title">
            Analyze Your Application
          </h1>

          <p className="analysis-subtitle">
            Complete each step to generate your resume
            analysis.
          </p>
        </div>

        <div className="analysis-step-counter">
          <span>{currentStep}</span>
          <span className="analysis-step-divider">/</span>
          <span>{steps.length}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="analysis-progress-wrapper">
        <div className="analysis-progress-line">
          <div
            className="analysis-progress-line-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="analysis-steps">
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            const completed =
              currentStep > stepNumber;

            const active =
              currentStep === stepNumber;

            return (
              <div
                key={step}
                className={`analysis-step ${
                  active
                    ? "analysis-step-active"
                    : ""
                } ${
                  completed
                    ? "analysis-step-completed"
                    : ""
                }`}
              >
                <div className="analysis-step-circle">
                  {completed ? (
                    <Check size={17} strokeWidth={2.5} />
                  ) : (
                    stepNumber
                  )}
                </div>

                <div className="analysis-step-content">
                  <span className="analysis-step-number">
                    STEP {stepNumber}
                  </span>

                  <span className="analysis-step-label">
                    {step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
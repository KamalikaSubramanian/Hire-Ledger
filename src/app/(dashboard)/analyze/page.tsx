"use client";

import ProgressBar from "@/components/analysis/ProgressBar";
import { useAnalysisStore } from "@/store/analysisStore";

import Step1Application from "@/components/analysis/Step1Application";
import Step2Resume from "@/components/analysis/Step2Resume";
import Step3JobDescription from "@/components/analysis/Step3JobDescription";
import Step4Review from "@/components/analysis/Step4Review";

export default function AnalyzePage() {
  const currentStep = useAnalysisStore(
    (state) => state.currentStep
  );

  return (
    <div className="page-container space-y-8">
      <ProgressBar />

      {currentStep === 1 && <Step1Application />}

      {currentStep === 2 && <Step2Resume />}

      {currentStep === 3 && <Step3JobDescription />}

      {currentStep === 4 && <Step4Review />}
    </div>
  );
}
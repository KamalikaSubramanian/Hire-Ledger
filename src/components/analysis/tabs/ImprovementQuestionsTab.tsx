"use client";

import ImprovementQuestionForm from "./Improve/ImprovementQuestionForm";

import { generateImprovedResume } from "@/actions/improvedResume.actions";

import {
  AnalysisDocument,
  ImprovementQuestion,
} from "@/types/analysis";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

interface Props {
  analysis: AnalysisDocument;
}

export default function ImprovementQuestionsTab({
  analysis,
}: Props) {
  const router = useRouter();

  const questions: ImprovementQuestion[] =
    analysis.analysisResult.improvementQuestions;

  async function handleSubmit(
    answers: Record<string, string>
  ) {
    const response = await generateImprovedResume(
      analysis._id,
      answers
    );

    if (!response.success) {
      console.error(response.message);
      return;
    }

    router.push(
      `/analysis/${analysis._id}/improved-resume`
    );
  }

  return (
    <div className="improvement-resume-container">

      {/* Header */}

      <div className="improvement-resume-header">

        <div className="improvement-resume-title">

          <div className="improvement-resume-icon">
            <Sparkles />
          </div>

          <div>
            <h2>Improve Resume</h2>

            <p>
              Answer a few questions so AI can build a
              stronger and more personalized resume.
            </p>
          </div>

        </div>

      </div>

      {/* Questions */}

      <ImprovementQuestionForm
        questions={questions}
        onSubmit={handleSubmit}
      />

    </div>
  );
}
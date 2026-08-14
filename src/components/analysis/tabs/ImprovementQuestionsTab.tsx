"use client";

import ImprovementQuestionForm from "./Improve/ImprovementQuestionForm";

import { generateImprovedResume } from "@/actions/improvedResume.actions";

import { AnalysisDocument, ImprovementQuestion } from "@/types/analysis";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

interface Props {
  analysis: AnalysisDocument;
}

export default function ImprovementQuestionsTab({ analysis }: Props) {
  const router = useRouter();

  const questions: ImprovementQuestion[] =
    analysis.analysisResult.improvementQuestions;

  async function handleSubmit(
  answers: Record<string, string>
) {
  console.log("Generate button clicked");
  console.log("Answers:", answers);
  console.log("Analysis ID:", analysis._id);

  try {
    const response = await generateImprovedResume(
      analysis._id,
      answers
    );

    console.log("generateImprovedResume response:", response);

    if (!response.success) {
      console.error(
        "Improved resume generation failed:",
        response.message
      );
      return;
    }

    console.log("Improved resume generated successfully");

    router.push(
      `/analysis/${analysis._id}/improved-resume`
    );

  } catch (error) {
    console.error(
      "Client error while generating resume:",
      error
    );
  }
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
              Answer a few questions so AI can build a stronger and more
              personalized resume.
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}

      <ImprovementQuestionForm questions={questions} onSubmit={handleSubmit} />
    </div>
  );
}

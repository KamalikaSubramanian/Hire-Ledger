"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { ImprovementQuestion } from "@/types/analysis";

interface Props {
  questions: ImprovementQuestion[];

  onSubmit: (
    answers: Record<string, string>
  ) => void | Promise<void>;
}

export default function ImprovementQuestionForm({
  questions,
  onSubmit,
}: Props) {
  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function updateAnswer(
    question: string,
    value: string
  ) {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      await onSubmit(answers);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="improvement-question-container">

      {/* Questions */}

      {questions.map((item, index) => (
        <div
          key={index}
          className="improvement-question-card"
        >

          {/* Question header */}

          <div className="improvement-question-header">

            <span className="improvement-question-number">
              Q{index + 1}
            </span>

            <div className="improvement-question-content">

              <label
                htmlFor={`question-${index}`}
                className="improvement-question-title"
              >
                {item.question}
              </label>

              <p className="improvement-question-reason">
                {item.reason}
              </p>

            </div>

          </div>

          {/* Answer */}

          <textarea
            id={`question-${index}`}
            rows={4}
            className="improvement-answer-input"
            placeholder="Type your answer here..."
            value={answers[item.question] ?? ""}
            onChange={(e) =>
              updateAnswer(
                item.question,
                e.target.value
              )
            }
          />

          {/* Answer indicator */}

          {answers[item.question]?.trim() && (
            <div className="improvement-answer-status">
              <CheckCircle2 />
              Answer added
            </div>
          )}

        </div>
      ))}

      {/* Submit */}

      <div className="improvement-submit-container">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="improvement-submit-button"
        >

          <Sparkles />

          {isSubmitting
            ? "Generating Improved Resume..."
            : "Generate Improved Resume"}

        </button>

        <p className="improvement-submit-note">
          AI will use your answers to create a stronger,
          ATS-optimized resume.
        </p>

      </div>

    </div>
  );
}
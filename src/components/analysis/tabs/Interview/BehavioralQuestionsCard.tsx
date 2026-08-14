import { MessageCircleQuestion } from "lucide-react";

interface Props {
  questions: string[];
}

export default function BehavioralQuestionsCard({
  questions,
}: Props) {
  return (
    <div className="interview-prep-card interview-behavioral-card">

      <div className="interview-prep-header">
        <div className="interview-prep-icon">
          <MessageCircleQuestion />
        </div>

        <div>
          <h2>Behavioral Questions</h2>

          <p>
            Questions designed to evaluate communication and workplace behavior.
          </p>
        </div>
      </div>

      <div className="interview-question-list">

        {questions.map((question, index) => (
          <div
            key={index}
            className="interview-question-item"
          >
            <span className="interview-question-number">
              Q{index + 1}
            </span>

            <p>
              {question}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}
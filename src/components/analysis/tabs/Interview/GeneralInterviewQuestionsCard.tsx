import { Users } from "lucide-react";

interface Props {
  questions: string[];
}

export default function GeneralInterviewQuestionsCard({
  questions,
}: Props) {
  return (
    <div className="interview-prep-card interview-general-card">

      <div className="interview-prep-header">
        <div className="interview-prep-icon">
          <Users />
        </div>

        <div>
          <h2>General Interview Questions</h2>

          <p>
            Common questions you should be ready to answer.
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
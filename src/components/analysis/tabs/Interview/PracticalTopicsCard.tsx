import { Wrench } from "lucide-react";

interface Props {
  topics: string[];
}

export default function PracticalTopicsCard({
  topics,
}: Props) {
  return (
    <div className="interview-prep-card interview-practical-card">

      <div className="interview-prep-header">
        <div className="interview-prep-icon">
          <Wrench />
        </div>

        <div>
          <h2>Practical Topics</h2>

          <p>
            Hands-on concepts and practical areas to revise.
          </p>
        </div>
      </div>

      <div className="interview-topic-list">
        {topics.map((topic, index) => (
          <span
            key={`${topic}-${index}`}
            className="interview-topic interview-practical-topic"
          >
            {topic}
          </span>
        ))}
      </div>

    </div>
  );
}
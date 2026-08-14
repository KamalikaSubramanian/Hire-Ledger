import { BookOpen } from "lucide-react";

interface Props {
  topics: string[];
}

export default function DomainTopicsCard({
  topics,
}: Props) {
  return (
    <div className="interview-prep-card interview-domain-card">

      <div className="interview-prep-header">
        <div className="interview-prep-icon">
          <BookOpen />
        </div>

        <div>
          <h2>Domain Topics</h2>

          <p>
            Technical areas you should prepare for this role.
          </p>
        </div>
      </div>

      <div className="interview-topic-list">
        {topics.map((topic, index) => (
          <span
            key={`${topic}-${index}`}
            className="interview-topic interview-domain-topic"
          >
            {topic}
          </span>
        ))}
      </div>

    </div>
  );
}
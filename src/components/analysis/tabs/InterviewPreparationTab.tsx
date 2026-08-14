import DomainTopicsCard from "./Interview/DomainTopicsCard";
import PracticalTopicsCard from "./Interview/PracticalTopicsCard";
import BehavioralQuestionsCard from "./Interview/BehavioralQuestionsCard";
import GeneralInterviewQuestionsCard from "./Interview/GeneralInterviewQuestionsCard";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

export default function InterviewPreparationTab({
  analysis,
}: Props) {
  const prep = analysis.analysisResult.interviewPreparation;

  return (
    <div className="interview-preparation-container">

      <DomainTopicsCard
        topics={prep.domainTopics}
      />

      <PracticalTopicsCard
        topics={prep.practicalTopics}
      />

      <BehavioralQuestionsCard
        questions={prep.behavioralQuestions}
      />

      <GeneralInterviewQuestionsCard
        questions={prep.generalInterviewQuestions}
      />

    </div>
  );
}

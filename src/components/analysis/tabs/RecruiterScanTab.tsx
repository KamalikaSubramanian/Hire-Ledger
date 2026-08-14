import InterviewChanceCard from "./Recruiter/InterviewChanceCard";
import FirstImpressionCard from "./Recruiter/FirstImpressionCard";
import ShortlistReasonsCard from "./Recruiter/ShortlistReasonsCard";
import RejectReasonsCard from "./Recruiter/RejectReasonsCard";
import IgnoredSectionsCard from "./Recruiter/IgnoredSectionsCard";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

export default function RecruiterScanTab({ analysis }: Props) {
  const recruiter = analysis.analysisResult.recruiterScan;

  return (
    <div className="recruiter-scan-container">

      <InterviewChanceCard
        score={recruiter.estimatedInterviewChance}
      />

      <FirstImpressionCard
        firstImpression={recruiter.firstImpression}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ShortlistReasonsCard
          reasons={recruiter.shortlistReasons}
        />

        <RejectReasonsCard
          reasons={recruiter.rejectReasons}
        />
      </div>

      <IgnoredSectionsCard
        ignored={recruiter.ignoredSections}
      />

    </div>
  );
}
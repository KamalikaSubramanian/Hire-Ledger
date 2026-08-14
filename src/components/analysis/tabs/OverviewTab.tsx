import StrengthsCard from "./Overview/StrengthCard";
import WeaknessesCard from "./Overview/WeaknessesCard";
import MotivationCard from "./Overview/MotivationCard";
import QuickSummaryCards from "./Overview/QuickSummaryCards";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function OverviewTab({ analysis }: Props) {
  return (
    <div className="analysis-overview">
      <QuickSummaryCards analysis={analysis} />

      <StrengthsCard analysis={analysis} />

      <WeaknessesCard analysis={analysis} />

      <MotivationCard analysis={analysis} />
    </div>
  );
}
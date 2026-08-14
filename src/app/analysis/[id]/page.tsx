export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

import { getAnalysisById } from "@/actions/analysis.actions";

import AnalysisHeader from "@/components/analysis/AnalysisHeader";
import AnalysisScoreCards from "@/components/analysis/AnalysisScoreCards";
import ResumeStrengthMeter from "@/components/analysis/ResumeStrengthMeter";
import AnalysisTabs from "@/components/analysis/AnalysisTabs";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnalysisPage({ params }: Props) {
  const { id } = await params;

  const response = await getAnalysisById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const analysis = response.data;

  return (
    <div className="page-container analysis-result-page">

      {/* Header */}
      <AnalysisHeader analysis={analysis} />

      {/* Score cards */}
      <AnalysisScoreCards analysis={analysis} />

      {/* Resume strength */}
      <ResumeStrengthMeter analysis={analysis} />

      {/* Detailed analysis */}
      <AnalysisTabs analysis={analysis} />

    </div>
  );
}
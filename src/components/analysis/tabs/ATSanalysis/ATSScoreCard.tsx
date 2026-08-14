import { ScanSearch } from "lucide-react";

import { AnalysisResult } from "@/types/analysis";

interface Props {
  analysis: AnalysisResult;
}

export default function ATSScoreCard({ analysis }: Props) {
  const ats = analysis.atsAnalysis;

  return (
    <div className="rounded-2xl border bg-card p-8 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">ATS Compatibility</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Applicant Tracking System score
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <ScanSearch className="h-7 w-7 text-primary" />
        </div>
      </div>

      <div className="mt-8 flex items-end gap-2">
        <h1 className="text-6xl font-bold">
          {ats.atsScore}
        </h1>

        <span className="pb-2 text-xl text-muted-foreground">
          %
        </span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{
            width: `${ats.atsScore}%`,
          }}
        />
      </div>
    </div>
  );
}
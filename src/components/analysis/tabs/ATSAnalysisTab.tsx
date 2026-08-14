import ATSScoreCard from "./ATSanalysis/ATSScoreCard";
import MatchedKeywords from "./ATSanalysis/MatchedKeywords";
import MissingKeywords from "./ATSanalysis/MissingKeywords";
import FormattingIssues from "./ATSanalysis/FormattingIssues";
import ATSSuggestions from "./ATSanalysis/ATSSuggestions";
import IndustryKeywords from "./ATSanalysis/IndustryKeywords";
import ParsingIssues from "./ATSanalysis/ParsingIssues";
import FileStructureIssues from "./ATSanalysis/FileStructureIssues";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

export default function ATSAnalysisTab({
  analysis,
}: Props) {
  const result = analysis.analysisResult;

  return (
    <div className="analysis-ats">

      {/* ATS Score */}
      <ATSScoreCard analysis={result} />

      {/* Keywords */}
      <div className="analysis-ats-keywords">

        <MatchedKeywords analysis={result} />

        <MissingKeywords analysis={result} />

        <IndustryKeywords analysis={result} />

      </div>

      {/* Resume Formatting */}
      <FormattingIssues analysis={result} />

      {/* Resume Parsing */}
      <ParsingIssues analysis={result} />

      {/* File Structure */}
      <FileStructureIssues analysis={result} />

      {/* Suggestions */}
      <ATSSuggestions analysis={result} />

    </div>
  );
}
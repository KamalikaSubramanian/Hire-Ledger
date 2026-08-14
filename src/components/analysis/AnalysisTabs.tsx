"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import OverviewTab from "./tabs/OverviewTab";
import ATSAnalysisTab from "./tabs/ATSAnalysisTab";
import SectionReviewTab from "./tabs/SectionReviewTab";
import RecruiterScanTab from "./tabs/RecruiterScanTab";
import InterviewPreparationTab from "./tabs/InterviewPreparationTab";
import ImprovementQuestionsTab from "./tabs/ImprovementQuestionsTab";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

export default function AnalysisTabs({ analysis }: Props) {
  return (
    <section className="analysis-tabs-section">
      <Tabs
        defaultValue="overview"
        className="analysis-tabs"
      >

        <TabsList className="analysis-tabs-list">
          <TabsTrigger
            value="overview"
            className="analysis-tab-trigger"
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="ats"
            className="analysis-tab-trigger"
          >
            ATS
          </TabsTrigger>

          <TabsTrigger
            value="sections"
            className="analysis-tab-trigger"
          >
            Section Review
          </TabsTrigger>

          <TabsTrigger
            value="recruiter"
            className="analysis-tab-trigger"
          >
            Recruiter Scan
          </TabsTrigger>

          <TabsTrigger
            value="interview"
            className="analysis-tab-trigger"
          >
            Interview Prep
          </TabsTrigger>

          <TabsTrigger
            value="improve"
            className="analysis-tab-trigger"
          >
            Improve Resume
          </TabsTrigger>
        </TabsList>


        <TabsContent
          value="overview"
          className="analysis-tab-content"
        >
          <OverviewTab
            analysis={analysis.analysisResult}
          />
        </TabsContent>


        <TabsContent
          value="ats"
          className="analysis-tab-content"
        >
          <ATSAnalysisTab analysis={analysis} />
        </TabsContent>

        <TabsContent
          value="sections"
          className="analysis-tab-content"
        >
          <SectionReviewTab analysis={analysis} />
        </TabsContent>

        <TabsContent
          value="recruiter"
          className="analysis-tab-content"
        >
          <RecruiterScanTab analysis={analysis} />
        </TabsContent>

        <TabsContent
          value="interview"
          className="analysis-tab-content"
        >
          <InterviewPreparationTab
            analysis={analysis}
          />
        </TabsContent>


        <TabsContent
          value="improve"
          className="analysis-tab-content"
        >
          <ImprovementQuestionsTab
            analysis={analysis}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
import ContactSection from "./Sections/ContactSection";
import SummarySection from "./Sections/SummarySection";
import SkillsSection from "./Sections/SkillsSection";
import ExperienceSection from "./Sections/ExperienceSection";
import EducationSection from "./Sections/EducationSection";
import ProjectsSection from "./Sections/ProjectsSection";
import CertificationsSection from "./Sections/CertificationsSection";

import { AnalysisDocument } from "@/types/analysis";

interface Props {
  analysis: AnalysisDocument;
}

export default function SectionReviewTab({ analysis }: Props) {
  const review = analysis.analysisResult.sectionReview;

  return (
    <div className="section-review-container">
      <ContactSection contact={review.contact} />

      <SummarySection summary={review.summary} />

      <SkillsSection skills={review.skills} />

      <ExperienceSection experience={review.experience} />

      <EducationSection education={review.education} />

      <ProjectsSection projects={review.projects} />

      <CertificationsSection certifications={review.certifications} />
    </div>
  );
}

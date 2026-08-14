import { Document, Page } from "@react-pdf/renderer";

import { ResumeData } from "@/types/newResume";

import styles from "./PDFStyles";

import PDFHeader from "./PDFHeader";
import PDFCareerObjective from "./PDFCareerObjective";
import PDFSummary from "./PDFSummary";
import PDFSkills from "./PDFSkills";
import PDFExperience from "./PDFExperience";
import PDFProjects from "./PDFProjects";
import PDFEducation from "./PDFEducation";
import PDFInternships from "./PDFInternships";
import PDFCertifications from "./PDFCertifications";
import PDFLanguages from "./PDFLanguages";
import PDFAchievements from "./PDFAchievements";
import PDFHighlights from "./PDFProfessionalHighlights";
import PDFVolunteer from "./PDFVolunteer";
import PDFProfiles from "./PDFProfile";

interface Props {
  resume: ResumeData;
}

export default function ResumePDF({ resume }: Props) {
  return (
    <Document>

      <Page size="A4" style={styles.page} wrap>

        {/* Header */}

        <PDFHeader
          contact={resume.contact}
        />

        {/* Career Objective */}

        {resume.careerObjective && (
          <PDFCareerObjective
            careerObjective={resume.careerObjective}
          />
        )}

        {/* Summary */}

        {resume.summary && (
          <PDFSummary
            summary={resume.summary}
          />
        )}

        {/* Skills */}

        {resume.skills && (
          <PDFSkills
            skills={resume.skills}
          />
        )}

        {/* Experience */}

        {resume.experience?.length > 0 && (
          <PDFExperience
            experience={resume.experience}
          />
        )}

        {/* Projects */}

        {resume.projects?.length > 0 && (
          <PDFProjects
            projects={resume.projects}
          />
        )}

        {/* Education */}

        {resume.education?.length > 0 && (
          <PDFEducation
            education={resume.education}
          />
        )}

        {/* Internships */}

        {resume.internships?.length > 0 && (
          <PDFInternships
            internships={resume.internships}
          />
        )}

        {/* Certifications */}

        {resume.certifications?.length > 0 && (
          <PDFCertifications
            certifications={resume.certifications}
          />
        )}

        {/* Languages */}

        {resume.languages?.length > 0 && (
          <PDFLanguages
            languages={resume.languages}
          />
        )}

        {/* Achievements */}

        {resume.achievements?.length > 0 && (
          <PDFAchievements
            achievements={resume.achievements}
          />
        )}

        {/* Highlights */}

        {resume.professionalHighlights?.length > 0 && (
          <PDFHighlights
            highlights={resume.professionalHighlights}
          />
        )}

        {/* Volunteer */}

        {resume.volunteerExperience?.length > 0 && (
          <PDFVolunteer
            volunteer={resume.volunteerExperience}
          />
        )}

        {/* Profiles */}

        {resume.profiles && (
          <PDFProfiles
            profiles={resume.profiles}
          />
        )}

      </Page>

    </Document>
  );
}
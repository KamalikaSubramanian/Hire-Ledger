"use client";

import { useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { Download, FileText, Pencil, Save, X } from "lucide-react";

import { Button } from "../ui/button";

import ResumePDF from "@/components/pdf/ResumePDF";
import { ResumeData } from "@/types/newResume";
import { updateImprovedResume } from "@/actions/improvedResume.actions";

import ResumeHeader from "./ResumeHeader";
import CareerObjectiveSection from "./CareerObjectiveSection";
import SummarySection from "./SummarySection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import InternshipSection from "./InternshipSection";
import CertificationSection from "./CertificationSection";
import LanguagesSection from "./LanguagesSection";
import AchievementsSection from "./AchievementsSection";
import HighlightsSection from "./HighlightsSection";
import VolunteerSection from "./VolunteerSection";
import ProfilesSection from "./ProfilesSection";

interface Props {
  resume: ResumeData;
  improvedResumeId: string;
}

export default function ResumePreview({
  resume,
  improvedResumeId,
}: Props) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingWord, setDownloadingWord] = useState(false);

  const [resumeData, setResumeData] =
    useState<ResumeData>(resume);

  if (!resume) return null;

  /* =========================================================
     UPDATE RESUME DATA
  ========================================================= */

  function updateResume<K extends keyof ResumeData>(
    field: K,
    value: ResumeData[K]
  ) {
    setResumeData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =========================================================
     SAVE
  ========================================================= */

  async function handleSave() {
    try {
      setSaving(true);

      const response = await updateImprovedResume(
        improvedResumeId,
        resumeData
      );

      if (response.success) {
        toast.success("Resume saved successfully.");
        setEditing(false);
      } else {
        toast.error("Unable to save resume.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     DOWNLOAD PDF
  ========================================================= */

  async function handleDownloadPDF() {
    try {
      setDownloadingPdf(true);

      const blob = await pdf(
        <ResumePDF resume={resumeData} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        `${resumeData.contact.name || "Resume"}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("Resume PDF downloaded.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to generate PDF.");
    } finally {
      setDownloadingPdf(false);
    }
  }

  /* =========================================================
     DOWNLOAD WORD
  ========================================================= */

 async function handleWordDownload() {
  try {
    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${resumeData.contact.name || "Resume"}</title>
        </head>

        <body>
          <h1>${resumeData.contact.name || ""}</h1>

          <p>
            ${resumeData.contact.email || ""}
            •
            ${resumeData.contact.phone || ""}
            •
            ${resumeData.contact.location || ""}
          </p>

          ${
            resumeData.careerObjective
              ? `
                <h2>Career Objective</h2>
                <p>${resumeData.careerObjective}</p>
              `
              : ""
          }

          ${
            resumeData.summary
              ? `
                <h2>Professional Summary</h2>
                <p>${resumeData.summary}</p>
              `
              : ""
          }

          ${
            resumeData.skills
              ? `
                <h2>Skills</h2>

                ${
                  resumeData.skills.technical.length
                    ? `<p><strong>Technical:</strong> ${resumeData.skills.technical.join(", ")}</p>`
                    : ""
                }

                ${
                  resumeData.skills.professional.length
                    ? `<p><strong>Professional:</strong> ${resumeData.skills.professional.join(", ")}</p>`
                    : ""
                }

                ${
                  resumeData.skills.applications.length
                    ? `<p><strong>Applications:</strong> ${resumeData.skills.applications.join(", ")}</p>`
                    : ""
                }

                ${
                  resumeData.skills.tools.length
                    ? `<p><strong>Tools:</strong> ${resumeData.skills.tools.join(", ")}</p>`
                    : ""
                }

                ${
                  resumeData.skills.languages.length
                    ? `<p><strong>Languages:</strong> ${resumeData.skills.languages.join(", ")}</p>`
                    : ""
                }
              `
              : ""
          }

          ${
            resumeData.experience.length
              ? `
                <h2>Experience</h2>

                ${resumeData.experience
                  .map(
                    (experience) => `
                      <h3>${experience.jobTitle}</h3>

                      <p>
                        <strong>${experience.organization}</strong>
                        ${
                          experience.location
                            ? ` | ${experience.location}`
                            : ""
                        }
                      </p>

                      <p>
                        ${experience.employmentType || ""}
                        ${
                          experience.duration
                            ? ` | ${experience.duration}`
                            : ""
                        }
                      </p>

                      <ul>
                        ${experience.responsibilities
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                      </ul>

                      ${
                        experience.achievements.length
                          ? `
                            <p><strong>Achievements</strong></p>
                            <ul>
                              ${experience.achievements
                                .map((item) => `<li>${item}</li>`)
                                .join("")}
                            </ul>
                          `
                          : ""
                      }
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.projects.length
              ? `
                <h2>Projects</h2>

                ${resumeData.projects
                  .map(
                    (project) => `
                      <h3>${project.title}</h3>

                      <p>
                        <strong>Role:</strong> ${project.role}
                        ${
                          project.duration
                            ? ` | ${project.duration}`
                            : ""
                        }
                      </p>

                      <p>${project.description}</p>

                      ${
                        project.outcome
                          ? `<p><strong>Outcome:</strong> ${project.outcome}</p>`
                          : ""
                      }

                      ${
                        project.responsibilities.length
                          ? `
                            <ul>
                              ${project.responsibilities
                                .map((item) => `<li>${item}</li>`)
                                .join("")}
                            </ul>
                          `
                          : ""
                      }

                      ${
                        project.toolsUsed.length
                          ? `
                            <p>
                              <strong>Tools:</strong>
                              ${project.toolsUsed.join(", ")}
                            </p>
                          `
                          : ""
                      }
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.education.length
              ? `
                <h2>Education</h2>

                ${resumeData.education
                  .map(
                    (education) => `
                      <h3>${education.degree}</h3>

                      <p>
                        <strong>${education.institution}</strong>
                        ${
                          education.location
                            ? ` | ${education.location}`
                            : ""
                        }
                      </p>

                      <p>
                        ${education.year || ""}
                        ${
                          education.grade
                            ? ` | ${education.grade}`
                            : ""
                        }
                      </p>

                      ${
                        education.specialization
                          ? `<p><strong>Specialization:</strong> ${education.specialization}</p>`
                          : ""
                      }
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.internships.length
              ? `
                <h2>Internships</h2>

                ${resumeData.internships
                  .map(
                    (internship) => `
                      <h3>${internship.role}</h3>

                      <p>
                        <strong>${internship.organization}</strong>
                        ${
                          internship.duration
                            ? ` | ${internship.duration}`
                            : ""
                        }
                      </p>

                      <ul>
                        ${internship.responsibilities
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.certifications.length
              ? `
                <h2>Certifications</h2>

                ${resumeData.certifications
                  .map(
                    (certification) => `
                      <p>
                        <strong>${certification.name}</strong>
                        ${
                          certification.issuer
                            ? ` - ${certification.issuer}`
                            : ""
                        }
                        ${
                          certification.year
                            ? ` (${certification.year})`
                            : ""
                        }
                      </p>
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.languages.length
              ? `
                <h2>Languages</h2>

                <ul>
                  ${resumeData.languages
                    .map(
                      (language) =>
                        `<li>${language.language} - ${language.proficiency}</li>`
                    )
                    .join("")}
                </ul>
              `
              : ""
          }

          ${
            resumeData.achievements.length
              ? `
                <h2>Achievements</h2>

                ${resumeData.achievements
                  .map(
                    (achievement) => `
                      <p>
                        <strong>${achievement.title}</strong>
                        ${
                          achievement.year
                            ? ` (${achievement.year})`
                            : ""
                        }
                      </p>

                      <p>${achievement.description}</p>
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.professionalHighlights.length
              ? `
                <h2>Professional Highlights</h2>

                ${resumeData.professionalHighlights
                  .map(
                    (highlight) => `
                      <h3>${highlight.title}</h3>
                      <p>${highlight.description}</p>
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.volunteerExperience.length
              ? `
                <h2>Volunteer Experience</h2>

                ${resumeData.volunteerExperience
                  .map(
                    (volunteer) => `
                      <h3>${volunteer.role}</h3>

                      <p>
                        <strong>${volunteer.organization}</strong>
                        ${
                          volunteer.duration
                            ? ` | ${volunteer.duration}`
                            : ""
                        }
                      </p>

                      <ul>
                        ${volunteer.responsibilities
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `
                  )
                  .join("")}
              `
              : ""
          }

          ${
            resumeData.profiles
              ? `
                <h2>Profiles</h2>

                <p>
                  ${resumeData.profiles.linkedin || ""}
                  ${resumeData.profiles.github || ""}
                  ${resumeData.profiles.portfolio || ""}
                  ${resumeData.profiles.website || ""}
                </p>
              `
              : ""
          }
        </body>
      </html>
    `;

    const blob = new Blob(
      ["\ufeff", html],
      {
        type: "application/msword",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${
      resumeData.contact.name || "Improved-Resume"
    }.doc`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Resume downloaded as Word document.");
  } catch (error) {
    console.error(error);

    toast.error("Unable to generate Word document.");
  }
}

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="improved-resume-page">
      <div className="improved-resume-container">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="improved-resume-header">

          <div className="improved-resume-header-content">
            <h1 className="improved-resume-title">
              Generated Resume
            </h1>

            <p className="improved-resume-description">
              AI-generated ATS-optimized resume based on your
              analysis and answers.
            </p>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="improved-resume-actions">

            <Button
              variant="outline"
              onClick={() =>
                setEditing((previous) => !previous)
              }
            >
              {editing ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>

            <Button
              disabled={!editing || saving}
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />

              {saving ? "Saving..." : "Save"}
            </Button>

            <Button
              variant="outline"
              disabled={downloadingPdf}
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-4 w-4" />

              {downloadingPdf
                ? "Generating..."
                : "Download PDF"}
            </Button>

            <Button
              variant="outline"
              disabled={downloadingWord}
              onClick={handleWordDownload}
            >
              <FileText className="mr-2 h-4 w-4" />

              {downloadingWord
                ? "Generating..."
                : "Download Word"}
            </Button>

          </div>
        </div>

        {/* ===================================================
            RESUME PREVIEW
        =================================================== */}

        <div
          ref={resumeRef}
          className="improved-resume-wrapper"
        >
          <div
            id="resume-pdf"
            className="resume-page print-resume"
          >

            {/* HEADER */}

            <ResumeHeader
              contact={resumeData.contact}
              editing={editing}
              onChange={(contact) =>
                updateResume("contact", contact)
              }
            />

            {/* CAREER OBJECTIVE */}

            {resumeData.careerObjective && (
              <CareerObjectiveSection
                careerObjective={
                  resumeData.careerObjective
                }
                editing={editing}
                onChange={(value) =>
                  updateResume(
                    "careerObjective",
                    value
                  )
                }
              />
            )}

            {/* SUMMARY */}

            {resumeData.summary && (
              <SummarySection
                summary={resumeData.summary}
                editing={editing}
                onChange={(value) =>
                  updateResume("summary", value)
                }
              />
            )}

            {/* SKILLS */}

            {resumeData.skills && (
              <SkillsSection
                skills={resumeData.skills}
                editing={editing}
                onChange={(skills) =>
                  updateResume("skills", skills)
                }
              />
            )}

            {/* EXPERIENCE */}

            {resumeData.experience?.length > 0 && (
              <ExperienceSection
                experience={resumeData.experience}
                editing={editing}
                onChange={(experience) =>
                  updateResume(
                    "experience",
                    experience
                  )
                }
              />
            )}

            {/* PROJECTS */}

            {resumeData.projects?.length > 0 && (
              <ProjectsSection
                projects={resumeData.projects}
                editing={editing}
                onChange={(projects) =>
                  updateResume(
                    "projects",
                    projects
                  )
                }
              />
            )}

            {/* EDUCATION */}

            {resumeData.education?.length > 0 && (
              <EducationSection
                education={resumeData.education}
                editing={editing}
                onChange={(education) =>
                  updateResume(
                    "education",
                    education
                  )
                }
              />
            )}

            {/* INTERNSHIPS */}

            {resumeData.internships?.length > 0 && (
              <InternshipSection
                internships={resumeData.internships}
                editing={editing}
                onChange={(internships) =>
                  updateResume(
                    "internships",
                    internships
                  )
                }
              />
            )}

            {/* CERTIFICATIONS */}

            {resumeData.certifications?.length > 0 && (
              <CertificationSection
                certifications={
                  resumeData.certifications
                }
                editing={editing}
                onChange={(certifications) =>
                  updateResume(
                    "certifications",
                    certifications
                  )
                }
              />
            )}

            {/* LANGUAGES */}

            {resumeData.languages?.length > 0 && (
              <LanguagesSection
                languages={resumeData.languages}
                editing={editing}
                onChange={(languages) =>
                  updateResume(
                    "languages",
                    languages
                  )
                }
              />
            )}

            {/* ACHIEVEMENTS */}

            {resumeData.achievements?.length > 0 && (
              <AchievementsSection
                achievements={
                  resumeData.achievements
                }
                editing={editing}
                onChange={(achievements) =>
                  updateResume(
                    "achievements",
                    achievements
                  )
                }
              />
            )}

            {/* PROFESSIONAL HIGHLIGHTS */}

            {
              resumeData.professionalHighlights
                ?.length > 0 && (
                <HighlightsSection
                  highlights={
                    resumeData.professionalHighlights
                  }
                  editing={editing}
                  onChange={(
                    professionalHighlights
                  ) =>
                    updateResume(
                      "professionalHighlights",
                      professionalHighlights
                    )
                  }
                />
              )
            }

            {/* VOLUNTEER EXPERIENCE */}

            {
              resumeData.volunteerExperience
                ?.length > 0 && (
                <VolunteerSection
                  volunteer={
                    resumeData.volunteerExperience
                  }
                  editing={editing}
                  onChange={(
                    volunteerExperience
                  ) =>
                    updateResume(
                      "volunteerExperience",
                      volunteerExperience
                    )
                  }
                />
              )
            }

            {/* PROFILES */}

            {resumeData.profiles && (
              <ProfilesSection
                profiles={resumeData.profiles}
                editing={editing}
                onChange={(profiles) =>
                  updateResume(
                    "profiles",
                    profiles
                  )
                }
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
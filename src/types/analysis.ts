// ================================
// Resume Health
// ================================

export interface StrengthMeter {
  ats: number;
  projects: number;
  certifications: number;
  skills: number;
  experience: number;
  education: number;
  formatting: number;
  credentials: number;
}

export interface ResumeHealth {
  resumeScore: number;
  formattingScore: number;
  grammarScore: number;
  strengthMeter: StrengthMeter;
}

// ================================
// ATS Analysis
// ================================

export interface ATSAnalysis {
  atsScore: number;

  matchedKeywords: string[];
  missingKeywords: string[];
  industryKeywords: string[];

  formattingIssues: string[];
  parsingIssues: string[];
  fileStructureIssues: string[];

  atsSuggestions: string[];
}

// ================================
// Job Match
// ================================

export interface JobMatch {
  jobMatchScore: number;

  jobTitleMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
}

// ================================
// Section Review
// ================================

export interface ContactReview {
  status: string;
  suggestions: string[];
  missing: string[];
}

export interface SummaryReview {
  status: string;
  suggestions: string[];
  missing: string[];
}

export interface SkillsReview {
  matched: string[];
  missing: string[];
  recommended: string[];
  industrySpecific: string[];
}

export interface ExperienceReview {
  status: string;

  requiredExperience: string;

  detectedExperience: string;

  experienceLevel: string;

  suggestions: string[];
}

export interface EducationReview {
  requiredQualification: string;

  detectedQualification: string;

  qualificationMatch: boolean;

  suggestions: string[];
}

export interface ProjectsReview {
  status: string;
  suggestions: string[];
}

export interface CertificationsReview {
  status: string;
  suggestions: string[];
}

export interface SectionReview {
  contact: ContactReview;

  summary: SummaryReview;

  skills: SkillsReview;

  experience: ExperienceReview;

  education: EducationReview;

  projects: ProjectsReview;

  certifications: CertificationsReview;
}

// ================================
// Missing Information
// ================================

export interface MissingInformation {
  phone: boolean;
  email: boolean;
  location: boolean;

  linkedin: boolean;
  github: boolean;
  portfolio: boolean;

  references: boolean;

  careerObjective: boolean;

  summary: boolean;
  education: boolean;
  experience: boolean;
  projects: boolean;
  certifications: boolean;
}

// ================================
// Industry
// ================================

export interface IndustryAnalysis {
  industry: string;
  careerLevel: string;
  resumeType: string;
}

export interface ResumeCategory {
  type: string;
  industry: string;
  experienceLevel: string;
}

// ================================
// Recruiter Scan
// ================================

export interface RecruiterScan {
  firstImpression: string;

  shortlistReasons: string[];

  rejectReasons: string[];

  ignoredSections: string[];

  estimatedInterviewChance: number;
}

// ================================
// Interview Preparation
// ================================

export interface InterviewPreparation {
  domainTopics: string[];

  practicalTopics: string[];

  behavioralQuestions: string[];

  generalInterviewQuestions: string[];
}

// ================================
// Improvement Questions
// ================================

export interface ImprovementQuestion {
  question: string;
  reason: string;
}

// ================================
// Analysis Result
// ================================

export interface AnalysisResult {
  resumeHealth: ResumeHealth;

  atsAnalysis: ATSAnalysis;

  jobMatch: JobMatch;

  overallScore: number;

  sectionReview: SectionReview;

  missingInformation: MissingInformation;

  industryAnalysis: IndustryAnalysis;

  strengths: string[];

  weaknesses: string[];

  recruiterScan: RecruiterScan;

  interviewPreparation: InterviewPreparation;

  improvementQuestions: ImprovementQuestion[];

  resumeCategory: ResumeCategory;

  motivation: string;
}


// ================================
// Analysis Document
// ================================


export interface AnalysisDocument {
  _id: string;

  userId: string;

  applicationId: string;

  resumeId: string;

  company: string;

  jobTitle: string;

  location: string;

  appliedDate: string;

  status: string;

  resumeName: string;

  resumeUrl: string;

  jobDescription: string;

  analysisTitle: string;

  analysisResult: AnalysisResult;

  analyzedAt: string;

  createdAt: string;

  updatedAt: string;

  __v: number;
}
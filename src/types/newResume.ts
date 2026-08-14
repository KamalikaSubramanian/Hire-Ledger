export interface Contact {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Skills {
  technical: string[];
  professional: string[];
  applications: string[];
  tools: string[];
  languages: string[];
  other: string[];
}

export interface Experience {
  jobTitle: string;
  organization: string;
  location: string;
  employmentType: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Project {
  title: string;
  role: string;
  duration: string;
  description: string;
  outcome: string;
  responsibilities: string[];
  toolsUsed: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  grade: string;
  specialization: string;
  relevantCoursework: string[];
}

export interface Profiles {
  linkedin: string;
  github: string;
  portfolio: string;
  website: string;
  leetcode: string;
  hackerrank: string;
  codechef: string;
  stackoverflow: string;
  other: string[];
}

export interface Internship {
  organization: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  credentialUrl: string;
  validTill: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Achievement {
  title: string;
  type: string;
  description: string;
  year: string;
}

export interface ProfessionalHighlight {
  title: string;
  description: string;
}

export interface VolunteerExperience {
  organization: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface ResumeData {
  contact: Contact;

  careerObjective: string;

  summary: string;

  skills: Skills;

  experience: Experience[];

  projects: Project[];

  education: Education[];

  profiles: Profiles;

  internships: Internship[];

  certifications: Certification[];

  languages: Language[];

  achievements: Achievement[];

  professionalHighlights: ProfessionalHighlight[];

  interests: string[];

  volunteerExperience: VolunteerExperience[];
}
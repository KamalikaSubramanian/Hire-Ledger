import { create } from "zustand";

interface AnalysisStore {
  /* =========================================================
     STATE
  ========================================================= */

  currentStep: number;

  applicationId: string;

  company: string;

  jobTitle: string;

  location: string;

  appliedDate: string;

  status: string;

  selectedResumeId: string;

  selectedResumeName: string;

  selectedResumeUrl: string;

  jobDescription: string;

  isAnalyzing: boolean;


  /* =========================================================
     STEP ACTIONS
  ========================================================= */

  setCurrentStep: (step: number) => void;

  nextStep: () => void;

  previousStep: () => void;


  /* =========================================================
     APPLICATION ACTIONS
  ========================================================= */

  setApplication: (data: {
    applicationId: string;
    company: string;
    jobTitle: string;
    location: string;
    appliedDate: string;
    status: string;
    jobDescription: string;
  }) => void;

  setApplicationId: (id: string) => void;


  /* =========================================================
     RESUME ACTIONS
  ========================================================= */

  setResume: (data: {
    selectedResumeId: string;
    selectedResumeName: string;
    selectedResumeUrl: string;
  }) => void;


  /* =========================================================
     JOB DESCRIPTION
  ========================================================= */

  setJobDescription: (text: string) => void;


  /* =========================================================
     ANALYSIS STATE
  ========================================================= */

  setAnalyzing: (loading: boolean) => void;


  /* =========================================================
     RESET
  ========================================================= */

  reset: () => void;
}


/* =============================================================
   STORE
============================================================= */

export const useAnalysisStore = create<AnalysisStore>((set) => ({

  /* =========================================================
     INITIAL STATE
  ========================================================= */

  currentStep: 1,

  applicationId: "",

  company: "",

  jobTitle: "",

  location: "",

  appliedDate: "",

  status: "",

  selectedResumeId: "",

  selectedResumeName: "",

  selectedResumeUrl: "",

  jobDescription: "",

  isAnalyzing: false,


  /* =========================================================
     STEP ACTIONS
  ========================================================= */

  setCurrentStep: (step) =>
    set({
      currentStep: step,
    }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),


  /* =========================================================
     APPLICATION
  ========================================================= */

  setApplication: (data) =>
    set({
      applicationId: data.applicationId,
      company: data.company,
      jobTitle: data.jobTitle,
      location: data.location,
      appliedDate: data.appliedDate,
      status: data.status,
      jobDescription: data.jobDescription,
    }),

  setApplicationId: (id) =>
    set({
      applicationId: id,
    }),


  /* =========================================================
     RESUME
  ========================================================= */

  setResume: (data) =>
    set({
      selectedResumeId: data.selectedResumeId,
      selectedResumeName: data.selectedResumeName,
      selectedResumeUrl: data.selectedResumeUrl,
    }),


  /* =========================================================
     JOB DESCRIPTION
  ========================================================= */

  setJobDescription: (text) =>
    set({
      jobDescription: text,
    }),


  /* =========================================================
     ANALYSIS
  ========================================================= */

  setAnalyzing: (loading) =>
    set({
      isAnalyzing: loading,
    }),


  /* =========================================================
     RESET APPLICATION WIZARD
  ========================================================= */

  reset: () =>
    set({
      currentStep: 1,

      applicationId: "",

      company: "",

      jobTitle: "",

      location: "",

      appliedDate: "",

      status: "",

      selectedResumeId: "",

      selectedResumeName: "",

      selectedResumeUrl: "",

      jobDescription: "",

      isAnalyzing: false,
    }),
}));
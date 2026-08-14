import { create } from "zustand";

interface DashboardStore {

  averageScore: number;

  missingSkills: number;

  pendingFollowUps: number;

  updateDashboard: (
    values: Partial<DashboardStore>
  ) => void;
}

export const useDashboardStore =
  create<DashboardStore>((set) => ({

    averageScore: 81,

    missingSkills: 12,

    pendingFollowUps: 5,

    updateDashboard: (values) =>
      set((state) => ({
        ...state,
        ...values,
      })),
  }));
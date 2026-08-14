import {
  LayoutDashboard,
  Briefcase,
  Brain,
  History,
  FileText,
  Sparkles,
  User,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Analyze",
    href: "/analyze",
    icon: Brain,
  },
    {
    title: "Analysis History",
    href: "/analysisHistory",
    icon: History,
  },
  {
    title: "Resume Library",
    href: "/resume-library",
    icon: FileText,
  },
  {
    title: "Skills",
    href: "/skills",
    icon: Sparkles,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];
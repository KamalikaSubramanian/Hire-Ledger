"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  FileSearch,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";

const features = [
  {
    title: "Resume Analysis",
    icon: FileSearch,
    description:
      "Analyze your resume against any job description and understand exactly where you stand.",
  },
  {
    title: "ATS Score",
    icon: Target,
    description:
      "Measure ATS compatibility and get practical suggestions to improve your resume.",
  },
  {
    title: "Skill Intelligence",
    icon: BrainCircuit,
    description:
      "Discover missing skills and understand which abilities can strengthen your profile.",
  },
  {
    title: "Resume Improvement",
    icon: Wrench,
    description:
      "Identify weak areas and get AI-powered recommendations to make your resume stronger.",
  },
  {
    title: "Dashboard Analytics",
    icon: BarChart3,
    description:
      "Track your analysis history, ATS performance, scores, and resume progress in one place.",
  },
  {
    title: "AI Powered",
    icon: Sparkles,
    description:
      "Use AI-driven insights to make better resume decisions and improve your interview opportunities.",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-orb hero-orb-blue" />
        <div className="hero-orb hero-orb-pink" />
        <div className="hero-orb hero-orb-purple" />

        <div className="home-hero-content">
          <div className="home-badge animate-fade-up">
            <Sparkles className="h-4 w-4" />
            <span>AI Resume Intelligence Platform</span>
          </div>

          <h1 className="home-title animate-fade-up">
            Hire <span className="home-title-gradient">Ledger</span>
          </h1>

          <p className="home-description animate-fade-up">
            Analyze your resume, improve ATS compatibility, discover skill gaps,
            and make smarter career decisions with AI-powered insights.
          </p>

          <div className="home-actions animate-fade-up">
            <Button
              size="lg"
              className="home-primary-button"
              onClick={() => router.push("/sign-up")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="home-secondary-button"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
          </div>

          <div className="home-trust animate-fade-up">
            <span className="home-trust-item">
              <span className="home-trust-dot" />
              AI-powered analysis
            </span>

            <span className="home-trust-divider" />

            <span>ATS compatibility</span>

            <span className="home-trust-divider" />

            <span>Career insights</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="home-section-container">
          <div className="home-section-heading">
            <div className="home-section-badge">
              <Sparkles className="h-4 w-4" />
              <span>Powerful tools</span>
            </div>

            <h2>Everything You Need to Improve Your Resume</h2>

            <p>
              Hire Ledger brings resume analysis, skill intelligence, ATS
              insights, and career preparation together in one platform.
            </p>
          </div>

          <div className="home-feature-grid stagger-children">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="home-feature-card">
                  <div className="home-feature-icon">
                    <Icon />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <div className="home-feature-accent" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-section">
        <div className="home-cta">
          <div className="home-cta-content">
            <div className="home-cta-label">
              <Sparkles className="h-5 w-5" />
              <span>Start your career improvement journey</span>
            </div>

            <h2>Ready to make your resume stronger?</h2>

            <p>
              Analyze your resume and discover exactly what you can improve.
            </p>
          </div>

          <Button
            size="lg"
            className="home-cta-button"
            onClick={() => router.push("/sign-up")}
          >
            Start Analyzing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div>
            <p className="home-footer-title">Hire Ledger</p>

            <p className="home-footer-description">
              AI-powered resume intelligence for smarter job applications.
            </p>
          </div>

          <p className="home-footer-copyright">
            © {new Date().getFullYear()} Hire Ledger
          </p>
        </div>
      </footer>
    </main>
  );
}

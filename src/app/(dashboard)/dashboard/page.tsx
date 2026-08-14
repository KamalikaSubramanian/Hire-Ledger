export const dynamic = "force-dynamic";
import { getDashboardStats } from "@/actions/dashboard.actions";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardActions from "@/components/dashboard/DashboardActions";
import DashboardCards from "@/components/dashboard/DashboardCards";
import AnalysisTrendChart from "@/components/dashboard/AnalysisTrendChart";
import ATSDistributionChart from "@/components/dashboard/ATSDistributionChart";

import TopMissingSkills from "@/components/dashboard/TopMissingSkills";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import BestResumeCard from "@/components/dashboard/BestResumeCard";
import AIRecommendations from "@/components/dashboard/AIRecommendations";

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  FileSearch,
  Lightbulb,
  Sparkles,
  Target,
  Upload,
} from "lucide-react";

export default async function DashboardPage() {
  const response = await getDashboardStats();

  if (!response.success || !response.data) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-content">
          <div className="dashboard-error">
            <h2>Unable to load dashboard</h2>

            <p>
              Something went wrong while loading your dashboard data.
              Please try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const data = response.data;

  const hasAnalyses =
    Array.isArray(data.recentAnalyses) &&
    data.recentAnalyses.length > 0;

  const hasMissingSkills =
    Array.isArray(data.topMissingSkills) &&
    data.topMissingSkills.length > 0;

  const hasRecommendations =
    Array.isArray(data.recommendations) &&
    data.recommendations.length > 0;

  const hasBestResume = Boolean(data.bestResume);

  return (
    <main className="dashboard-page">
      {/* Background */}
      <div className="dashboard-background">
        <div className="dashboard-orb dashboard-orb-blue" />
        <div className="dashboard-orb dashboard-orb-pink" />
        <div className="dashboard-orb dashboard-orb-purple" />
      </div>

      <div className="dashboard-content">


        <section className="dashboard-section dashboard-animate">
          <DashboardHeader />
        </section>


        <section className="dashboard-section dashboard-animate dashboard-delay-1">
          <DashboardActions />
        </section>


        <section className="dashboard-section dashboard-animate dashboard-delay-2">
          <DashboardCards stats={data} />
        </section>


        {!hasAnalyses && (
          <section className="dashboard-section dashboard-animate dashboard-delay-3">
            <div className="dashboard-welcome">

              <div className="dashboard-welcome-content">

                <div className="dashboard-welcome-icon">
                  <Sparkles />
                </div>

                <div>
                  <span className="dashboard-welcome-label">
                    GET STARTED
                  </span>

                  <h2>
                    Turn your resume into a stronger job application.
                  </h2>

                  <p>
                    Upload your resume and compare it with a job description
                    to discover your ATS score, missing skills, and areas
                    you can improve.
                  </p>
                </div>

              </div>

              <div className="dashboard-welcome-actions">

                <a
                  href="/dashboard/resume-analysis"
                  className="dashboard-primary-action"
                >
                  <Upload className="h-4 w-4" />

                  Analyze My Resume

                  <ArrowRight className="h-4 w-4" />
                </a>

              </div>

            </div>
          </section>
        )}


        <section className="dashboard-section dashboard-animate dashboard-delay-3">

          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                PERFORMANCE
              </span>

              <h2>Resume Analytics</h2>

              <p>
                Track how your resume performance changes over time.
              </p>
            </div>
          </div>


          {hasAnalyses ? (
            <div className="dashboard-chart-grid">

              <div className="dashboard-panel">
                <AnalysisTrendChart data={data.trend} />
              </div>

              <div className="dashboard-panel">
                <ATSDistributionChart
                  data={data.scoreDistribution}
                />
              </div>

            </div>
          ) : (
            <div className="dashboard-empty-grid">

              <DashboardEmptyCard
                icon={BarChart3}
                title="Your performance trend"
                description="Your ATS performance will appear here after your first resume analysis."
                action="Analyze a resume"
                href="/dashboard/resume-analysis"
              />

              <DashboardEmptyCard
                icon={Target}
                title="ATS score distribution"
                description="Compare your resume scores and see how your applications perform over time."
                action="Get your first score"
                href="/dashboard/resume-analysis"
              />

            </div>
          )}

        </section>


        <section className="dashboard-section dashboard-animate dashboard-delay-4">

          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                SKILL INTELLIGENCE
              </span>

              <h2>Skills to Improve</h2>

              <p>
                Discover the skills that can make your resume more competitive.
              </p>
            </div>
          </div>


          {hasMissingSkills ? (
            <div className="dashboard-panel dashboard-panel-large">
              <TopMissingSkills
                skills={data.topMissingSkills}
              />
            </div>
          ) : (
            <DashboardInsightEmpty
              icon={BrainCircuit}
              title="Discover your missing skills"
              description="Once you analyze your resume against a job description, Hire Ledger will identify the skills you are missing and show which ones matter most."
              action="Analyze a job"
              href="/dashboard/resume-analysis"
            />
          )}

        </section>


        <section className="dashboard-section dashboard-animate dashboard-delay-5">

          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                ACTIVITY
              </span>

              <h2>Recent Analyses</h2>

              <p>
                Access your latest resume analysis results.
              </p>
            </div>
          </div>


          {hasAnalyses ? (
            <div className="dashboard-panel dashboard-panel-large">
              <RecentAnalyses
                analyses={data.recentAnalyses}
              />
            </div>
          ) : (
            <div className="dashboard-empty-activity">

              <div className="dashboard-empty-activity-icon">
                <FileSearch />
              </div>

              <div className="dashboard-empty-activity-content">

                <h3>
                  No analyses yet
                </h3>

                <p>
                  Your resume analysis history will appear here after
                  you complete your first analysis.
                </p>

              </div>

              <a
                href="/dashboard/resume-analysis"
                className="dashboard-secondary-action"
              >
                Start analysis
                <ArrowRight className="h-4 w-4" />
              </a>

            </div>
          )}

        </section>


        <section className="dashboard-section dashboard-animate dashboard-delay-6">

          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                AI INSIGHTS
              </span>

              <h2>Improve Your Chances</h2>

              <p>
                Personalized recommendations based on your resume.
              </p>
            </div>
          </div>


          {hasBestResume || hasRecommendations ? (

            <div className="dashboard-bottom-grid">

              <div className="dashboard-panel dashboard-best-resume">
                <BestResumeCard
                  resume={data.bestResume}
                />
              </div>

              <div className="dashboard-panel dashboard-ai-panel">
                <AIRecommendations
                  recommendations={data.recommendations}
                />
              </div>

            </div>

          ) : (

            <div className="dashboard-ai-empty">

              <div className="dashboard-ai-empty-icon">
                <Lightbulb />
              </div>

              <div className="dashboard-ai-empty-content">

                <span>AI CAREER INSIGHTS</span>

                <h3>
                  Personalized recommendations are waiting for you.
                </h3>

                <p>
                  Analyze your resume to receive AI-powered suggestions
                  for improving your resume, skills, and job applications.
                </p>

              </div>

              <a
                href="/dashboard/resume-analysis"
                className="dashboard-primary-action"
              >
                Get recommendations
                <ArrowRight className="h-4 w-4" />
              </a>

            </div>

          )}

        </section>


        {!hasAnalyses && (
          <section className="dashboard-section dashboard-animate dashboard-delay-6">

            <div className="dashboard-section-heading">
              <div>
                <span className="dashboard-section-label">
                  YOUR NEXT STEPS
                </span>

                <h2>
                  Get started in three simple steps
                </h2>
              </div>
            </div>


            <div className="dashboard-steps">

              <DashboardStep
                number="01"
                icon={Upload}
                title="Upload your resume"
                description="Add your current resume to Hire Ledger."
              />

              <DashboardStep
                number="02"
                icon={Target}
                title="Analyze against a job"
                description="Compare your resume with a real job description."
              />

              <DashboardStep
                number="03"
                icon={Sparkles}
                title="Improve with AI"
                description="Use your score and recommendations to improve."
              />

            </div>

          </section>
        )}

      </div>
    </main>
  );
}



function DashboardEmptyCard({
  icon: Icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="dashboard-empty-card">

      <div className="dashboard-empty-card-icon">
        <Icon />
      </div>

      <div className="dashboard-empty-card-content">

        <h3>{title}</h3>

        <p>{description}</p>

        <a href={href}>
          {action}
          <ArrowRight className="h-4 w-4" />
        </a>

      </div>

    </div>
  );
}



function DashboardInsightEmpty({
  icon: Icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  href: string;
}) {
  return (
    <div className="dashboard-insight-empty">

      <div className="dashboard-insight-icon">
        <Icon />
      </div>

      <div className="dashboard-insight-content">

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

      <a
        href={href}
        className="dashboard-secondary-action"
      >
        {action}

        <ArrowRight className="h-4 w-4" />
      </a>

    </div>
  );
}



function DashboardStep({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="dashboard-step">

      <div className="dashboard-step-number">
        {number}
      </div>

      <div className="dashboard-step-icon">
        <Icon />
      </div>

      <div>
        <h3>{title}</h3>

        <p>{description}</p>
      </div>

    </div>
  );
}
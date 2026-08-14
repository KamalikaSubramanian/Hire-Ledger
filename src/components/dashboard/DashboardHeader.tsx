import { Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <section className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-header-icon">
          <Sparkles />
        </div>

        <div className="dashboard-header-text">
          <p className="dashboard-header-eyebrow">
            Welcome back
          </p>

          <h1 className="dashboard-header-title">
            {greeting} 👋
          </h1>

          <p className="dashboard-header-description">
            Welcome back to Hire Ledger. Let&apos;s make your resume
            stronger today.
          </p>
        </div>
      </div>

      <div className="dashboard-header-shine" />
    </section>
  );
}
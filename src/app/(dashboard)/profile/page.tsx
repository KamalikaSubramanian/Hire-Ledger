import { getProfileStats } from "@/actions/profile.actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Mail,
  Calendar,
  FileText,
  BarChart3,
  UserRound,
} from "lucide-react";

export default async function ProfilePage() {
  const response = await getProfileStats();

  if (!response.success || !response.data) {
    return (
      <div className="profile-error">
        Unable to load profile.
      </div>
    );
  }

  const profile = response.data;

  return (
    <div className="profile-page">
      <div className="profile-page-container">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="profile-page-header">
          <div className="profile-header-icon">
            <UserRound />
          </div>

          <div>
            <h1 className="profile-page-title">
              Profile
            </h1>

            <p className="profile-page-description">
              View and manage your account information.
            </p>
          </div>
        </div>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <Card className="profile-main-card">

          <CardHeader className="profile-card-header">
            <CardTitle className="profile-card-title">
              Your Information
            </CardTitle>

            <p className="profile-card-subtitle">
              Your account details and resume activity.
            </p>
          </CardHeader>

          <CardContent className="profile-card-content">

            {/* =================================================
                USER HEADER
            ================================================= */}

            <div className="profile-user-section">

              <div className="profile-avatar-wrapper">
                <Avatar className="profile-avatar">
                  <AvatarImage
                    src={profile.imageUrl || ""}
                    alt={`${profile.firstName} ${profile.lastName}`}
                  />

                  <AvatarFallback className="profile-avatar-fallback">
                    {profile.firstName?.charAt(0)?.toUpperCase()}
                    {profile.lastName?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="profile-user-info">
                <h2 className="profile-user-name">
                  {profile.firstName} {profile.lastName}
                </h2>

                <p className="profile-user-role">
                  Resume Intelligence User
                </p>

                <div className="profile-user-email">
                  <Mail />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="profile-divider" />

            {/* =================================================
                ACCOUNT INFORMATION
            ================================================= */}

            <div className="profile-info-grid">

              <Info
                icon={<Mail />}
                label="Email"
                value={profile.email}
                className="profile-info-blue"
              />

              <Info
                icon={<Calendar />}
                label="Joined"
                value={new Date(
                  profile.createdAt
                ).toLocaleDateString("en-GB")}
                className="profile-info-purple"
              />

              <Info
                icon={<FileText />}
                label="Resumes Uploaded"
                value={String(profile.totalResumes)}
                className="profile-info-orange"
              />

              <Info
                icon={<BarChart3 />}
                label="Resume Analyses"
                value={String(profile.totalAnalyses)}
                className="profile-info-green"
              />

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function Info({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`profile-info-card ${className}`}>

      <div className="profile-info-icon">
        {icon}
      </div>

      <div className="profile-info-content">

        <p className="profile-info-label">
          {label}
        </p>

        <p className="profile-info-value">
          {value}
        </p>

      </div>

    </div>
  );
}
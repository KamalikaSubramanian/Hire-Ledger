# Hire Ledger

### AI-Powered Resume Analysis & Career Intelligence Platform

Hire Ledger is a full-stack **AI-powered resume analysis platform** that helps job seekers understand how well their resume matches a specific job description, identify missing skills, improve their resume using AI, and track their application analysis history over time.

It combines **resume management, ATS analysis, AI-powered improvement, document generation, analytics, and application tracking** into one platform.

---

## 🚀 Why Hire Ledger?

Instead of simply analyzing a resume once, Hire Ledger maintains a complete history of the user's resume evaluations.

For every analysis, users can track:

* Resume used
* Company name
* Job title
* Job location
* Job description
* Date of analysis
* ATS score
* Overall resume score
* Missing skills
* Strengths and weaknesses
* AI recommendations

Users can also compare how **different versions of their resumes perform against different jobs**.

The platform can generate an **AI-improved version of the resume**, which can be downloaded as **PDF or Word**, and users can continue editing the improved resume and generate another improved version whenever required.

---

## ✨ Key Features

### 🔐 Authentication & User Management

* Clerk-based authentication
* Sign up / Sign in / Sign out
* Protected application routes
* User synchronization with MongoDB
* User-specific resume and analysis data

### 📄 Resume Management

* Upload resumes
* Store resumes securely
* Resume library
* View previously uploaded resumes
* Maintain multiple resume versions
* Compare performance between different resumes

### 🤖 AI Resume Analysis

Users provide:

```text
Resume
+
Job Description
+
Job Information
```

The AI analyzes the resume and provides:

* ATS score
* Overall score
* Matching skills
* Missing skills
* Strengths
* Weaknesses
* Improvement suggestions
* Resume optimization recommendations

---

### 📊 Analysis History & Tracking

Every analysis is logged and associated with the authenticated user.

Each record can contain:

```text
Resume
Company Name
Job Title
Job Location
Job Description
Analysis Date
ATS Score
Overall Score
Analysis Result
```

This allows users to return to previous applications and understand how their resume performed for different opportunities.

---

### 📈 Resume & ATS Comparison

Hire Ledger allows users to evaluate different resumes against different job descriptions.

Users can compare:

```text
Resume Version A → ATS Score
Resume Version B → ATS Score
Resume Version C → ATS Score
```

This helps determine which resume version performs better for a particular job opportunity.

The dashboard also provides:

* Total analyses
* Total resumes
* Average ATS score
* Highest ATS score
* ATS score distribution
* Analysis trends
* Frequently missing skills
* Recent analyses
* Best-performing analysis

---

### 🧠 AI-Powered Resume Improvement

After analyzing a resume, users can generate an improved version using AI suggestions.

The improvement workflow is:

```text
Original Resume
      ↓
Job Description
      ↓
AI Analysis
      ↓
ATS Score + Suggestions
      ↓
AI Improved Resume
      ↓
Edit / Refine
      ↓
Improved Resume Version
```

Users can continue improving the generated resume instead of starting from scratch.

---

### 📝 Editable Improved Resume

The AI-generated resume is not treated as a final static document.

Users can:

* Review the improved resume
* Edit its content
* Modify sections
* Improve achievements
* Refine skills
* Update experience
* Generate another improved version

This creates an iterative resume improvement workflow.

---

### 📥 Resume Export

Improved resumes can be generated and downloaded in:

* **PDF**
* **Microsoft Word (.docx)**

The application uses document-generation and PDF-rendering libraries to create downloadable resume documents.

---

## 📊 Dashboard

The personalized dashboard provides a central view of resume performance.

### Resume Analytics

* Total analyses
* Total resumes
* Average ATS score
* Highest ATS score
* Analysis activity
* ATS score distribution

### Skill Intelligence

The application identifies frequently missing skills across previous analyses.

For example:

```text
JavaScript       8
TypeScript       6
System Design    5
AWS              4
Docker           3
```

This helps users identify recurring skill gaps instead of looking at each analysis independently.

### AI Career Recommendations

Recommendations are generated based on the user's analysis history, ATS performance, missing skills, and resume quality.

---

# 🛠️ Technology Stack

## Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **shadcn/ui**
* **Zustand**
* **React Hook Form**
* **Zod**
* **Recharts**
* **Lucide React**
* **Framer-style UI animations / CSS animations**
* **next-themes**

## Backend

* **Next.js Server Actions**
* **Next.js App Router**
* **Next.js Route Handlers**
* **Node.js**
* **MongoDB**
* **Mongoose**
* **Clerk**
* **Google Gemini / @google/genai**

## Resume & Document Processing

* **pdfjs-dist** — PDF processing
* **react-pdf** — PDF viewing
* **@react-pdf/renderer** — PDF generation
* **docx** — Word document generation
* **html2pdf.js** — HTML-to-PDF conversion
* **react-to-print** — Printable resume output
* **react-dropzone** — Resume/file uploads
* **Cloudinary** — File/media storage

## UI & Utilities

* **Base UI**
* **Radix UI**
* **Lucide React**
* **class-variance-authority**
* **clsx**
* **tailwind-merge**
* **sonner**
* **axios**

## Development

* **ESLint**
* **Prettier**
* **Prettier Tailwind CSS plugin**
* **TypeScript**
* **Git & GitHub**
* **Vercel**

---

# 🏗️ Technical Architecture

```text
                         ┌─────────────────────┐
                         │       Clerk         │
                         │ Authentication      │
                         └──────────┬──────────┘
                                    │
                                    ▼
┌───────────────┐          ┌─────────────────────┐
│    Next.js    │          │   Server Actions    │
│ React + UI    │─────────▶│   & Route Handlers  │
└───────┬───────┘          └──────────┬──────────┘
        │                             │
        │                             ▼
        │                   ┌─────────────────────┐
        │                   │      MongoDB        │
        │                   │     Mongoose        │
        │                   └─────────────────────┘
        │
        ▼
┌─────────────────────┐
│    Gemini AI        │
│ Resume Analysis &   │
│ Resume Improvement  │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────┐
│ PDF / Word Generation    │
│ @react-pdf/renderer      │
│ docx / html2pdf.js       │
└──────────────────────────┘
```

---

# 🧩 Main Application Flow

```text
Sign In
   ↓
Dashboard
   ↓
Create Resume Analysis
   ↓
Select / Upload Resume
   ↓
Enter Job Details
   ↓
Add Job Description
   ↓
AI Analysis
   ↓
ATS Score + Missing Skills + Recommendations
   ↓
Save Analysis History
   ↓
Generate Improved Resume
   ↓
Edit Improved Resume
   ↓
Export PDF / Word
```

---

# 🗂️ Main Modules

### Dashboard

Centralized resume analytics and AI recommendations.

### Resume Library

Stores and manages multiple resumes and resume versions.

### Resume Analysis

Compares a selected resume against a job description.

### Analysis History

Maintains a complete record of previous job applications and resume analyses.

### AI Resume Improvement

Uses analysis results and job requirements to generate an improved resume.

### Improved Resume Editor

Allows users to manually edit and refine AI-generated resumes.

### Resume Export

Converts improved resumes into downloadable PDF and Word documents.

### Profile & Skills

Allows users to manage their career profile and track relevant skills.

---

# 🗄️ Data & Analytics

MongoDB aggregation pipelines are used for dashboard analytics.

Examples include:

### ATS Score Distribution

```text
0–50
50–70
70–90
90–100
```

### Monthly Analysis Trend

Analysis records are grouped by their creation date to visualize application activity.

### Missing Skill Analysis

Missing skills are normalized, grouped, counted, sorted, and used to identify the user's most frequent skill gaps.

---

# 🔄 State Management

Zustand is used for client-side application state.

Important state areas include:

* Analysis workflow
* Current analysis step
* Sidebar state
* Resume analysis data
* User interaction state

The analysis workflow follows:

```text
Step 1 → Application
Step 2 → Resume
Step 3 → Job Description
Step 4 → Review & Analyze
```

---

# 🔒 Security & Authentication

Clerk manages authentication and session handling.

Protected pages use authenticated server-side access to ensure users can only access their own:

* Resumes
* Analyses
* Profile information
* Analysis history
* AI-generated documents

Sensitive configuration such as API keys and database credentials is stored using environment variables.

`.env.local` is excluded from version control.

---

# 📱 Responsive Design

Hire Ledger is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The interface includes responsive:

* Sidebar
* Navbar
* Dashboard cards
* Charts
* Resume forms
* Analysis workflow
* Resume editor
* Document preview

---

# 📦 Important Dependencies

The project uses a modern Next.js ecosystem.

```json
{
  "@clerk/nextjs": "^7.5.20",
  "@google/genai": "^2.13.0",
  "@hookform/resolvers": "^5.4.0",
  "@react-pdf/renderer": "^4.5.1",
  "axios": "^1.18.1",
  "cloudinary": "^2.10.0",
  "docx": "^9.7.1",
  "html2pdf.js": "^0.14.0",
  "mongoose": "^9.7.4",
  "next": "16.2.10",
  "next-themes": "^0.4.6",
  "pdfjs-dist": "^5.4.296",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-dropzone": "^19.1.1",
  "react-hook-form": "^7.82.0",
  "react-pdf": "^10.4.1",
  "react-to-print": "^3.3.0",
  "recharts": "^3.9.2",
  "shadcn": "^4.13.0",
  "sonner": "^2.0.7",
  "zod": "^4.4.3",
  "zustand": "^5.0.14"
}
```

Development tooling includes:

```text
TypeScript
ESLint
Prettier
Tailwind CSS
PostCSS
```

---

# 🚀 Getting Started

### 1. Clone

```bash
git clone <YOUR_REPOSITORY_URL>
cd hire_ledger
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
```

### 6. Production server

```bash
npm start
```

---

# ☁️ Deployment

The application is deployed on **Vercel**.

```text
GitHub
   ↓
Vercel
   ↓
Production Build
   ↓
Live Application
```

Environment variables are configured in the Vercel project settings.

---

# 🎯 What This Project Demonstrates

Hire Ledger demonstrates practical implementation of:

* Full-stack Next.js architecture
* React 19 + TypeScript
* App Router
* Server Components
* Client Components
* Server Actions
* Clerk authentication
* Protected routes
* MongoDB + Mongoose
* MongoDB aggregation
* Zustand state management
* AI integration with Gemini
* Resume/PDF processing
* Word document generation
* PDF generation
* File uploads
* Cloudinary integration
* Form validation
* Responsive UI
* Dashboard analytics
* Data visualization
* AI-powered content generation
* Resume version management
* Analysis history
* Production deployment with Vercel

---

# 🔮 Future Improvements

* Job board integration
* Automatic job discovery
* Job application tracking
* Application reminders
* AI-generated cover letters
* Interview preparation
* Skill learning recommendations
* Advanced resume comparison
* Career progress analytics

---

## 👩‍💻 Developer

**Kamalika Subramanian**

Built as a production-oriented full-stack project combining **AI, resume intelligence, authentication, database management, analytics, document generation, and responsive web development**.

---

### ⭐ Project Highlights

> **Analyze → Understand → Improve → Edit → Export → Track**

Hire Ledger transforms resume optimization from a one-time activity into a continuous, data-driven workflow.

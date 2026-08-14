"use server";

import { ai } from "@/lib/gemini";
import { resumeAnalysisPrompt } from "@/lib/prompts/resume-analysis";

import { connectDB } from "@/lib/mongodb";

import { syncUser } from "./user.actions";

import Application from "@/models/Application";
import Resume from "@/models/Resume";
import Analysis from "@/models/Analysis";

import { serialize } from "@/types/action";

function extractJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  }
}

export async function analyzeResume(applicationId: string) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const application = await Application.findOne({
      _id: applicationId,
      userId: user.data._id,
    });

    if (!application) {
      return {
        success: false,
        message: "Application not found.",
      };
    }

    if (!application.resumeId) {
      return {
        success: false,
        message: "Resume not selected.",
      };
    }

    const resume = await Resume.findById(application.resumeId);

    if (!resume) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }

    // ==============================
    // Download Resume PDF
    // ==============================

    const fileResponse = await fetch(resume.url);

    if (!fileResponse.ok) {
      return {
        success: false,
        message: "Unable to download resume.",
      };
    }

    const arrayBuffer = await fileResponse.arrayBuffer();

    const pdfBase64 = Buffer.from(arrayBuffer).toString("base64");

    // ==============================
    // Ask Gemini
    // ==============================

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-flash-latest",

      contents: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: pdfBase64,
          },
        },
        {
          text: `
${resumeAnalysisPrompt}

Job Description

${application.jobDescription}
`,
        },
      ],
    });

    const responseText = geminiResponse.text?.trim();

    if (!responseText) {
      return {
        success: false,
        message: "Gemini returned an empty response.",
      };
    }

    let result: any;

    try {
      result = extractJson(responseText);
    } catch (error) {
      console.error("Gemini JSON Parse Error");
      console.log(responseText);

      return {
        success: false,
        message: "Unable to parse AI response.",
      };
    }

    if (
      !result.resumeHealth ||
      !result.atsAnalysis ||
      !result.jobMatch ||
      !result.sectionReview
    ) {
      return {
        success: false,
        message: "Invalid analysis received from Gemini.",
      };
    }

    // ==============================
    // Save Analysis
    // ==============================

    // const analysis = await Analysis.create({
    //   // References
    //   userId: user.data._id,

    //   applicationId: application._id,

    //   resumeId: resume._id,

    //   // Application Snapshot
    //   company: application.company,

    //   jobTitle: application.jobTitle,

    //   location: application.location,

    //   appliedDate: application.appliedDate,

    //   Status: application.status,

    //   // Resume Snapshot
    //   resumeName: resume.fileName,

    //   resumeUrl: resume.url,

    //   // Job Description Snapshot
    //   jobDescription: application.jobDescription,

    //   // Analysis Title
    //   analysisTitle: `${application.company} - ${application.jobTitle}`,

    //   // AI Results
    //   matchScore: result.jobMatch.overallScore,

    //   matchedSkills: result.sectionReview.skills.matched ?? [],

    //   missingSkills: result.sectionReview.skills.missing ?? [],

    //   strengths: result.strengths ?? [],

    //   weaknesses: result.weaknesses ?? [],

    //   suggestions: [
    //     ...(result.sectionReview.contact.suggestions ?? []),
    //     ...(result.sectionReview.summary.suggestions ?? []),
    //     ...(result.sectionReview.skills.suggestions ?? []),
    //     ...(result.sectionReview.projects.suggestions ?? []),
    //     ...(result.sectionReview.education.suggestions ?? []),
    //     ...(result.sectionReview.experience.suggestions ?? []),
    //   ],

    //   overallFeedback: result.motivation ?? "",

    //   analyzedAt: new Date(),
    // });

    const analysis = await Analysis.create({
      userId: user.data._id,

      applicationId: application._id,

      resumeId: resume._id,

      company: application.company,

      jobTitle: application.jobTitle,

      location: application.location,

      appliedDate: application.appliedDate,

      status: application.status,

      resumeName: resume.fileName,

      resumeUrl: resume.url,

      jobDescription: application.jobDescription,

      analysisTitle: `${application.company} - ${application.jobTitle}`,

      analysisResult: result,
    });

    await Application.findByIdAndUpdate(application._id, {
      status: "Ready to Apply",
    });

    return {
      success: true,
      data: serialize(analysis),
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);

    return {
      success: false,
      message: "Gemini analysis failed.",
    };
  }
}

export async function getAnalysisById(id: string) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const analysis = await Analysis.findOne({
      _id: id,
      userId: user.data._id,
    });

    if (!analysis) {
      return {
        success: false,
        message: "Analysis not found.",
      };
    }

    return {
      success: true,
      data: serialize(analysis),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch analysis.",
    };
  }
}

export async function getUserAnalysisHistory({
  search = "",
  company = "",
  score = "",
  date = "",
  sort = "latest",
  page = 1,
  limit = 10,
}: {
  search?: string;
  company?: string;
  score?: string;
  date?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
      };
    }
     const query: any = {
      userId: user.data._id,
    };

    // Search

    if (search) {
      query.$or = [
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          jobTitle: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Company Filter

    if (company) {
      query.company = {
        $regex: company,
        $options: "i",
      };
    }

    // Score Filter

    if (score) {
  switch (score) {
    case "0-50":
      query["analysisResult.atsAnalysis.atsScore"] = {
        $gte: 0,
        $lt: 50,
      };
      break;

    case "50-70":
      query["analysisResult.atsAnalysis.atsScore"] = {
        $gte: 50,
        $lt: 70,
      };
      break;

    case "70-90":
      query["analysisResult.atsAnalysis.atsScore"] = {
        $gte: 70,
        $lt: 90,
      };
      break;

    case "90-100":
      query["analysisResult.atsAnalysis.atsScore"] = {
        $gte: 90,
        $lte: 100,
      };
      break;
  }
}

    // Date Filter

    if (date) {
      const start = new Date(date);

      start.setHours(0, 0, 0, 0);

      const end = new Date(date);

      end.setHours(23, 59, 59, 999);

      query.analyzedAt = {
        $gte: start,
        $lte: end,
      };
    }

    // Sorting

    let sortQuery: any = {};

    switch (sort) {
      case "latest":
        sortQuery = {
          analyzedAt: -1,
        };
        break;

      case "oldest":
        sortQuery = {
          analyzedAt: 1,
        };
        break;

      case "highest":
        sortQuery = {
          "analysisResult.atsAnalysis.atsScore": -1,
        };
        break;

      case "lowest":
        sortQuery = {
           "analysisResult.atsAnalysis.atsScore": 1,
        };
        break;

      default:
        sortQuery = {
          analyzedAt: -1,
        };
    }

    const skip = (page - 1) * limit;

    const totalItems =
      await Analysis.countDocuments(query);

    const analyses = await Analysis.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      success: true,
      data: serialize(analyses),
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      }}
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: "Unable to fetch analyses",
    };
  }
}

"use server";

import { ai } from "@/lib/gemini";
import { resumeBuilderPrompt } from "@/lib/prompts/resume-builder";
import Analysis from "@/models/Analysis";
import { syncUser } from "./user.actions";
import Resume from "@/models/Resume";
import { connectDB } from "@/lib/mongodb";
import ImprovedResume from "@/models/ImprovedResume";
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

export async function generateImprovedResume(analysisId: string, answers: any) {
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
      _id: analysisId,
      userId: user.data._id,
    });

    if (!analysis) {
      return {
        success: false,
        message: "Analysis not found.",
      };
    }

    if (!analysis.resumeId) {
      return {
        success: false,
        message: "Resume not selected.",
      };
    }
    console.log("Analysis:", analysis);
    console.log("Analysis resumeId:", analysis.resumeId);
    const resume = await Resume.findById(analysis.resumeId);

    if (!resume) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }
    console.log("Resume document:", resume);
    const response = await fetch(resume.url);
    if (!response.ok) {
      return {
        success: false,
        message: "Unable to download resume.",
      };
    }
    const arrayBuffer = await response.arrayBuffer();

    const pdfBase64 = Buffer.from(arrayBuffer).toString("base64");

    const formattedAnswers = Object.entries(answers)
      .map(([question, answer]) => `${question}: ${answer}`)
      .join("\n");

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

${resumeBuilderPrompt}

Job Description

${analysis.jobDescription}

Previous Analysis

${JSON.stringify(analysis.analysisResult)}

User Answers

${formattedAnswers}

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

    let result;

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

    const previousCount = await ImprovedResume.countDocuments({
      analysisId: analysis._id,
    });

    const savedResume = await ImprovedResume.create({
      userId: user.data._id,
      analysisId: analysis._id,
      resume: result,
      version: previousCount + 1,
    });

    return {
      success: true,
      data: serialize(savedResume),
      message: "Improved resume generated successfully.",
    };
  } catch (err) {
  console.error("generateImprovedResume ERROR:", err);

  return {
    success: false,
    message:
      err instanceof Error
        ? err.message
        : "Failed to generate improved resume.",
  };
}
}

export async function getImprovedResume(id: string) {
  try {
    await connectDB();
    console.log("Requested ID:", id);
    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const resume = await ImprovedResume.findOne({
      analysisId: id,
      userId: user.data._id,
    }).lean();

    if (!resume) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }
    console.log("Found Resume:", resume);
    const serialized = serialize(resume);

    console.log("Serialized:", serialized);
    return {
      success: true,
      data: serialized,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch resume.",
    };
  }
}

export async function updateImprovedResume(id: string, resume: any) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const updated = await ImprovedResume.findOneAndUpdate(
      {
        _id: id,
        userId: user.data._id,
      },
      {
        resume,
      },
      {
        new: true,
      },
    ).lean();

    if (!updated) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }

    return {
      success: true,
      data: serialize(updated),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to update resume.",
    };
  }
}

export async function getResumeVersions(analysisId: string) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const resumes = await ImprovedResume.find({
      analysisId,
      userId: user.data._id,
    })
      .select("version createdAt updatedAt")
      .sort({
        version: -1,
      })
      .lean();

    return {
      success: true,
      data: serialize(resumes),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch resume versions.",
    };
  }
}

export async function deleteResumeVersion(id: string) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const deleted = await ImprovedResume.findOneAndDelete({
      _id: id,
      userId: user.data._id,
    });

    if (!deleted) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }

    return {
      success: true,
      message: "Resume deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to delete resume.",
    };
  }
}

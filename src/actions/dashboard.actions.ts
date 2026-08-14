"use server";

import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import { syncUser } from "./user.actions";
import { serialize } from "@/types/action";
import Resume from "@/models/Resume";
import mongoose from "mongoose";

export async function getDashboardStats() {
  try {
    await connectDB();

    const user = await syncUser();

    console.log(user);

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userId = user.data._id;

    const analyses = await Analysis.find({
      userId,
    }).lean();

    const totalAnalysis = analyses.length;

    const resumes = await Resume.countDocuments({
      userId,
    });

    let avgATS = 0;

    let highestATS = 0;

    analyses.forEach((analysis: any) => {
      const ats = analysis.analysisResult?.atsAnalysis?.atsScore || 0;

      avgATS += ats;

      if (ats > highestATS) highestATS = ats;
    });

    // avgATS

    avgATS = totalAnalysis > 0 ? Math.round(avgATS / totalAnalysis) : 0;

    // LINE CHART

    const monthlyTrend = await Analysis.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.data._id),
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          total: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    console.log("Monthly Trend Aggregate:", monthlyTrend);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const trend = monthlyTrend.map((item) => ({
      month: months[item._id.month],
      total: item.total,
    }));

    // PIE CHART

    const scoreDistribution = await Analysis.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.data._id),
        },
      },
      {
        $project: {
          atsScore: "$analysisResult.atsAnalysis.atsScore",
        },
      },
      {
        $bucket: {
          groupBy: "$atsScore",
          boundaries: [0, 50, 70, 90, 101],
          default: "Other",
          output: {
            total: {
              $sum: 1,
            },
          },
        },
      },
    ]);

    const scoreMap: Record<string, number> = {
      "0-50": 0,
      "50-70": 0,
      "70-90": 0,
      "90-100": 0,
    };

    scoreDistribution.forEach((item: any) => {
      switch (item._id) {
        case 0:
          scoreMap["0-50"] = item.total;
          break;

        case 50:
          scoreMap["50-70"] = item.total;
          break;

        case 70:
          scoreMap["70-90"] = item.total;
          break;

        case 90:
          scoreMap["90-100"] = item.total;
          break;
      }
    });

    const pieChartData = [
      {
        name: "0-50",
        value: scoreMap["0-50"],
      },
      {
        name: "50-70",
        value: scoreMap["50-70"],
      },
      {
        name: "70-90",
        value: scoreMap["70-90"],
      },
      {
        name: "90-100",
        value: scoreMap["90-100"],
      },
    ];

    // MISSING SKILLS

    const missingSkillsAgg = await Analysis.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user.data._id),
        },
      },
      {
        $unwind: "$analysisResult.sectionReview.skills.missing",
      },
      {
        $group: {
          _id: {
            $toLower: "$analysisResult.sectionReview.skills.missing",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    const topMissingSkills = missingSkillsAgg.map((item: any) => ({
      skill: item._id,
      count: item.count,
    }));

    // RECENT ANALYSES

    const recentAnalyses = await Analysis.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(3)
      .select("company jobTitle analysisResult.overallScore createdAt _id")
      .lean();

    // BEST RESUME

    const bestResume = await Analysis.findOne({
      userId,
    })
      .sort({
        "analysisResult.overallScore": -1,
      })
      .select(
        `
      company
      jobTitle
      resumeName
      analysisResult.overallScore
      analysisResult.atsAnalysis.atsScore
      analysisResult.strengths
      _id
    `,
      )
      .lean();

    // AI RECOMMENDATIONS

    const recommendations: string[] = [];

    // 1. Low ATS score
    if (avgATS < 70) {
      recommendations.push(
        "Improve your ATS score by using standard section headings and adding more job-specific keywords.",
      );
    }

    // 2. Top missing skill
    if (topMissingSkills.length > 0) {
      recommendations.push(
        `Learn ${topMissingSkills[0].skill}. It is your most frequently missing skill across analyses.`,
      );
    }

    // 3. Low overall score
    if (bestResume && bestResume.analysisResult?.overallScore < 80) {
      recommendations.push(
        "Strengthen your projects section with measurable achievements and quantified results.",
      );
    }

    // 4. ATS formatting
    if (bestResume && bestResume.analysisResult?.atsAnalysis?.atsScore < 80) {
      recommendations.push(
        "Improve resume formatting by using a single-column layout and standard fonts for better ATS parsing.",
      );
    }

    // 5. Consistent recommendation
    recommendations.push(
      "Tailor your resume for every job description before applying to maximize your match score.",
    );

    // Fill until there are 5 recommendations
    const defaults = [
      "Keep your LinkedIn and GitHub profiles updated.",
      "Add relevant certifications to strengthen your profile.",
      "Review your resume every month and remove outdated information.",
      "Include more action verbs and measurable achievements in your experience section.",
    ];

    for (const tip of defaults) {
      if (recommendations.length >= 5) break;
      recommendations.push(tip);
    }

    return {
      success: true,
      data: serialize({
        totalAnalysis,
        totalResumes: resumes,
        avgATS,
        highestATS,
        trend,
        scoreDistribution: pieChartData,
        topMissingSkills,
        recentAnalyses,
        bestResume,
        recommendations,
      }),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Unable to load dashboard",
    };
  }
}

"use server";

import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import { syncUser } from "./user.actions";
import { serialize } from "@/types/action";

export async function getSkillsDashboard({
  search = "",
  sort = "highest",
  page = 1,
  limit = 10,
}: {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user?.success) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const analyses = await Analysis.find({
      userId: user.data._id,
    })
      .select(
        `
        company
        jobTitle
        analysisResult.sectionReview.skills.matched
        analysisResult.sectionReview.skills.missing
      `,
      )
      .lean();

    const totalAnalyses = analyses.length;

    const skillsMap = new Map<
      string,
      {
        skill: string;
        missingCount: number;
        matchedCount: number;
        missingIn: any[];
        matchedIn: any[];
      }
    >();

    analyses.forEach((analysis: any) => {
      const matched =
        analysis.analysisResult?.sectionReview?.skills?.matched || [];

      const missing =
        analysis.analysisResult?.sectionReview?.skills?.missing || [];

      matched.forEach((skill: string) => {
        if (!skillsMap.has(skill)) {
          skillsMap.set(skill, {
            skill,
            missingCount: 0,
            matchedCount: 0,
            missingIn: [],
            matchedIn: [],
          });
        }

        const item = skillsMap.get(skill)!;

        item.matchedCount++;

        item.matchedIn.push({
          analysisId: analysis._id,
          company: analysis.company,
          jobTitle: analysis.jobTitle,
        });
      });

      missing.forEach((skill: string) => {
        if (!skillsMap.has(skill)) {
          skillsMap.set(skill, {
            skill,
            missingCount: 0,
            matchedCount: 0,
            missingIn: [],
            matchedIn: [],
          });
        }

        const item = skillsMap.get(skill)!;

        item.missingCount++;

        item.missingIn.push({
          analysisId: analysis._id,
          company: analysis.company,
          jobTitle: analysis.jobTitle,
        });
      });
    });

    let skills = Array.from(skillsMap.values()).map((item) => {
      const total = item.missingCount + item.matchedCount;

      const totalOccurrences = item.missingCount + item.matchedCount;

      const missingPercentage =
        totalOccurrences === 0
          ? 0
          : Math.round((item.missingCount / totalOccurrences) * 100);

      const proficiencyRatio = total === 0 ? 0 : item.matchedCount / total;

      let proficiency = "Beginner";

      if (proficiencyRatio >= 0.75) proficiency = "Advanced";
      else if (proficiencyRatio >= 0.5) proficiency = "Intermediate";
      else if (proficiencyRatio >= 0.2) proficiency = "Basic";

      let priority = "Low";

      if (missingPercentage >= 80) priority = "High";
      else if (missingPercentage >= 50) priority = "Medium";

      return {
        ...item,
        missingPercentage,
        proficiency,
        priority,
      };
    });

    if (search) {
      skills = skills.filter((skill) =>
        skill.skill.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sort) {
      case "highest":
        skills.sort((a, b) => b.missingPercentage - a.missingPercentage);
        break;

      case "lowest":
        skills.sort((a, b) => a.missingPercentage - b.missingPercentage);
        break;

      case "az":
        skills.sort((a, b) => a.skill.localeCompare(b.skill));
        break;

      case "za":
        skills.sort((a, b) => b.skill.localeCompare(a.skill));
        break;
    }

    const totalItems = skills.length;

    const totalPages = Math.ceil(totalItems / limit);

    const paginated = skills.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: serialize(paginated),
      pagination: {
        page,
        totalPages,
        totalItems,
      },
      stats: {
        totalSkills: skills.length,
        frequentlyMissing: skills.filter((s) => s.priority === "High").length,
        strongSkills: skills.filter((s) => s.proficiency === "Advanced").length,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Unable to load skills",
    };
  }
}

"use server";

import { connectDB } from "@/lib/mongodb";

import { syncUser } from "./user.actions";

import Resume from "@/models/Resume";

import Analysis from "@/models/Analysis";

import { serialize } from "@/types/action";

export async function getProfileStats() {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user?.success) {
      return {
        success: false,
      };
    }

    const totalResumes =
      await Resume.countDocuments({
        userId: user.data._id,
      });

    const totalAnalyses =
      await Analysis.countDocuments({
        userId: user.data._id,
      });

    return {
      success: true,

      data: serialize({
        ...user.data,

        totalResumes,

        totalAnalyses,
      }),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}
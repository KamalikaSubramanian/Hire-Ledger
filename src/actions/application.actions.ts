"use server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { CreateApplicationProps } from "@/types/application";
import {
  ApplicationSchema,
  ApplicationFormValues,
} from "@/validators/application.validator";
import { ActionResponse } from "@/types/action";
import { validate } from "@/lib/validate";
import { syncUser } from "@/actions/user.actions";
import { serialize } from "@/types/action";
import mongoose from "mongoose";

interface GetApplicationsParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: number;
}

export async function createApplication(data: CreateApplicationProps) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const application = await Application.create({
      userId: user.data._id,

      company: data.company,

      jobTitle: data.jobTitle,

      location: data.location,

      status: "Draft",

      appliedDate: data.appliedDate,
    });

    return {
      success: true,
      data: serialize(application),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function updateApplicationResume(
  applicationId: string,
  resumeId: string,
) {
  try {
    await connectDB();

    await Application.findByIdAndUpdate(applicationId, {
      resumeId,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to update application.",
    };
  }
}

export async function updateApplicationJobDescription(
  applicationId: string,
  jobDescription: string,
) {
  try {
    await connectDB();

    await Application.findByIdAndUpdate(applicationId, {
      jobDescription,
    });
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Unable to update application for Job Description.",
    };
  }
}

export async function getApplications({
  search,
  status,
  sort,
  page,
}: GetApplicationsParams): Promise<ActionResponse<any>> {
  try {
    await connectDB();
    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const query: any = {
      userId: user.data._id,
    };

    // Search by company or job title
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

    // Filter by status
    if (status && status !== "All") {
      query.status = status;
    }
    const PAGE_SIZE = 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * PAGE_SIZE;
    let sortOption = {};
    switch (sort) {
      case "oldest":
        sortOption = {
          appliedDate: 1,
        };
        break;

      case "company-asc":
        sortOption = {
          company: 1,
        };
        break;

      case "company-desc":
        sortOption = {
          company: -1,
        };
        break;

      default:
        sortOption = {
          appliedDate: -1,
        };
    }
    const total = await Application.countDocuments(query);
    const applications = await Application.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean();
    const totalPages = Math.ceil(total / PAGE_SIZE);
    return {
      success: true,
      data: {
        applications: serialize(applications),
        total,
        currentPage,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Get Applications Error:", error);

    return {
      success: false,
      message: "Unable to fetch applications.",
    };
  }
}

export async function getApplicationById(
  id: string,
): Promise<ActionResponse<any>> {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const application = await Application.findOne({
      _id: id,
      userId: user.data._id,
    }).lean();

    if (!application) {
      return {
        success: false,
        message: "Application not found.",
      };
    }

    return {
      success: true,
      data: serialize(application),
    };
  } catch (error) {
    console.error("Get ApplicationById Error:", error);

    return {
      success: false,
      message: "Application not found.",
    };
  }
}

export async function getApplicationStats() {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const applications = await Application.find({
      userId: user.data._id,
    }).lean();

    const stats = {
      total: applications.length,
      applied: applications.filter((a) => a.status === "Applied").length,
      interview: applications.filter((a) => a.status === "Interview").length,
      offer: applications.filter((a) => a.status === "Offer").length,
      accepted: applications.filter((a) => a.status === "Accepted").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
    };

    return {
      success: true,
      data: serialize(stats),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch statistics.",
    };
  }
}

export async function getRecentApplications() {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const applications = await Application.find({
      userId: user.data._id,
    })
      .sort({
        appliedDate: -1,
      })
      .limit(5)
      .lean();

    return {
      success: true,
      data: serialize(applications),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch recent applications.",
    };
  }
}

export async function getMonthlyApplications() {
  await connectDB();

  const user = await syncUser();

  if (!user.success || !user.data) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const userObjectId = new mongoose.Types.ObjectId(user.data._id);
  const result = await Application.aggregate([
    {
      $match: {
        userId: userObjectId,
      },
    },
    {
      $group: {
        _id: {
          $month: "$appliedDate",
        },
        applications: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const months = [
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

  const data = result.map((item) => ({
    month: months[item._id - 1],
    applications: item.applications,
  }));

  return {
    success: true,
    data,
  };
}

export async function getStatusChartData() {
  await connectDB();

  const user = await syncUser();

  if (!user.success || !user.data) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const userObjectId = new mongoose.Types.ObjectId(user.data._id);
  const result = await Application.aggregate([
    {
      $match: {
        userId: userObjectId,
      },
    },
    {
      $group: {
        _id: "$status",
        value: {
          $sum: 1,
        },
      },
    },
  ]);

  const COLORS: Record<string, string> = {
    Applied: "#3b82f6",
    Interview: "#f59e0b",
    Offer: "#8b5cf6",
    Accepted: "#22c55e",
    Rejected: "#ef4444",
  };

  return {
    success: true,
    data: result.map((item) => ({
      name: item._id,
      value: item.value,
      fill: COLORS[item._id] ?? "#94a3b8",
    })),
  };
}

export async function createApplication_(
  data: CreateApplicationProps,
): Promise<ActionResponse<any>> {
  try {
    await connectDB();
    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const validated = validate(ApplicationSchema, data);

    const application = await Application.create({
      ...validated,
      userId: user.data._id,
      status: "Draft",
    });

    return {
      success: true,
      data: serialize(application),
    };
  } catch (error) {
    console.error("Create Application Error:", error);
    return {
      success: false,
      message: "Unable to create application.",
    };
  }
}

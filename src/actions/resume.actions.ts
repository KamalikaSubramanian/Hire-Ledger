"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import Resume from "@/models/Resume";
import { syncUser } from "./user.actions";
import { serialize } from "@/types/action";


export async function uploadResume(formData: FormData) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const file = formData.get("resume") as File | null;

    if (!file) {
      return {
        success: false,
        message: "No file selected.",
      };
    }
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "hire-ledger/resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    const resume = await Resume.create({
      userId: user.data._id,

      fileName: file.name,

      publicId: uploadResult.public_id,

      url: uploadResult.secure_url,

      size: file.size,

      uploadedAt: new Date(),
    });


    revalidatePath("/resume");
    return {
      success: true,
      data:serialize(resume),
      message: "Resume uploaded successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Upload failed.",
    };
  }
}

export async function getUserResumes() {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const resumes = await Resume.find({
      userId: user.data._id,
    })
      .sort({
        uploadedAt: -1,
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
      message: "Unable to fetch resumes.",
    };
  }
}

export async function deleteResume(resumeId: string) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: user.data._id,
    });

    if (!resume) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    // Delete from MongoDB
    await Resume.findByIdAndDelete(resumeId);

    revalidatePath("/resume");

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

export async function getResumeById(
  resumeId: string
) {
  try {
    await connectDB();

    const user = await syncUser();

    if (!user.success || !user.data) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: user.data._id,
    }).lean();

    if (!resume) {
      return {
        success: false,
        message: "Resume not found.",
      };
    }

    return {
      success: true,
      data: serialize(resume),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to fetch resume.",
    };
  }
}

"use server";

import User from "@/models/user";
import { connectDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { serialize } from "@/types/action";

export interface CreateUserParams {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export async function syncUser() {
  try {
    await connectDB();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    let user = await User.findOne({
      clerkId: clerkUser.id,
    }).lean();

    if (!user) {
      await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      });

      user = await User.findOne({
        clerkId: clerkUser.id,
      }).lean();
    }

    return {
      success: true,
      data: serialize(user),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to sync user.",
    };
  }
}

import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

import {
  createUser,
  updateUser,
  deleteUser,
} from "@/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing Clerk Webhook Secret");
  }

  const payload = await req.text();

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing Svix Headers", {
      status: 400,
    });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let event: any;

  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook verification failed", err);

    return new NextResponse("Invalid Signature", {
      status: 400,
    });
  }

  const { type, data } = event;

  switch (type) {
    case "user.created":
      await createUser({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
      break;

    case "user.updated":
      await updateUser({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
      break;

    case "user.deleted":
      await deleteUser(data.id);
      break;

    default:
      console.log(`Unhandled event: ${type}`);
  }

  return NextResponse.json({
    success: true,
  });
}


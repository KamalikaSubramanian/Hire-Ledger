import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;

// clerkId
// clerkId: {
//   type: String,
//   required: true,
//   unique: true,
// }

// This is the link between Clerk and MongoDB.

// Model
// const User = models.User || model("User", UserSchema);

// Why not just write:
// model("User", UserSchema);
// Because in development, Next.js hot reloads files.

// If the model is recreated, Mongoose throws:
// OverwriteModelError:
// Cannot overwrite `User` model once compiled.

// Using:
// models.User || model(...)
// prevents that error.
//******  Next.js reloads modules during development. Reusing an existing model prevents Mongoose's OverwriteModelError caused by redefining the same model.

// Why do we store clerkId instead of only the email?

// Answer:
// The Clerk ID is a permanent, unique identifier. Email addresses can change, but the Clerk ID remains the same, making it the correct field for relating authentication data to application data.
import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    // Owner
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Notification Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification Message
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification Type
    type: {
      type: String,
      enum: [
        "Application",
        "Resume",
        "AI",
        "Interview",
        "Reminder",
      ],
      default: "Application",
    },

    // Read Status
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  models.Notification ||
  model("Notification", NotificationSchema);

export default Notification;
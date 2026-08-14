import { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,

      enum: [
        "Draft",
        "Ready to Apply",
        "Applied",
        "Interview Scheduled",
        "Interview Completed",
        "Offer",
        "Rejected",
        "Withdrawn",
      ],

      default: "Draft",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },
    resumeId: {
      type: String,
      default: null,
    },
    
    jobDescription: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Application =
  models.Application || model("Application", ApplicationSchema);

export default Application;

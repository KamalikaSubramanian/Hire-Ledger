import mongoose, { Schema, model, models } from "mongoose";

const ImprovedResumeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    analysisId: {
      type: Schema.Types.ObjectId,
      ref: "Analysis",
      required: true,
    },

    resume: {
      type: Object,
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ImprovedResume ||
  model("ImprovedResume", ImprovedResumeSchema);
import { Schema, model, models } from "mongoose";

const AnalysisSchema = new Schema(
  {
    // ======================
    // References
    // ======================

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    // ======================
    // Snapshot of Application
    // ======================

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

    appliedDate: {
      type: Date,
    },

    status: {
      type: String,
      default: "Draft",
    },

    // ======================
    // Snapshot of Resume
    // ======================

    resumeName: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    // ======================
    // Job Description
    // ======================

    jobDescription: {
      type: String,
      required: true,
    },

    // ======================
    // AI Result
    // ======================

    analysisTitle: {
      type: String,
      default: "",
    },

    analysisResult: {
      type: Object,
      required: true,
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Analysis || model("Analysis", AnalysisSchema);

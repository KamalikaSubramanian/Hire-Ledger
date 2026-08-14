import { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    // Owner of the skill
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Skill name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User proficiency (0–100)
    proficiency: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Source of the skill
    source: {
      type: String,
      enum: ["Resume", "AI", "Manual"],
      default: "Resume",
    },
  },
  {
    timestamps: true,
  }
);

const Skill =
  models.Skill ||
  model("Skill", SkillSchema);

export default Skill;
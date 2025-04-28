import mongoose, { Schema, Document } from "mongoose";
import { CampaignStatus, ICampaign } from "../../types";

export interface ICampaignDocument extends ICampaign, Document {}

const CampaignSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Campaign name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Campaign description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.ACTIVE,
    },
    leads: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          // Simple URL validation for LinkedIn profiles
          return v.every((url: string) => url.includes("linkedin.com/in/"));
        },
        message: "Leads must be valid LinkedIn profile URLs",
      },
    },
    accountIDs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICampaignDocument>("Campaign", CampaignSchema);

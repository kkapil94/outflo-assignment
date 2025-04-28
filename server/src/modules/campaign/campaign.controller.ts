import { Request, Response } from "express";
import { campaignService } from "../../services/campaignService";
import { errorResponse, successResponse } from "../../utils/reponseHandler";
import { CampaignStatus, ILinkedInProfile } from "../../types";
import mongoose from "mongoose";
import { aiService } from "../../services/aiService";

export const getCampaigns = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    successResponse(res, campaigns, "Campaigns fetched successfully");
  } catch (error) {
    errorResponse(res, "Failed to fetch campaigns", 500, error);
  }
};

export const getCampaignById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorResponse(res, "Invalid campaign ID", 400);
      return;
    }

    const campaign = await campaignService.getCampaignById(id);

    if (!campaign) {
      errorResponse(res, "Campaign not found", 404);
      return;
    }

    successResponse(res, campaign, "Campaign fetched successfully");
  } catch (error) {
    errorResponse(res, "Failed to fetch campaign", 500, error);
  }
};

export const createCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const campaignData = req.body;

    // Validate status if provided
    if (
      campaignData.status &&
      !Object.values(CampaignStatus).includes(campaignData.status)
    ) {
      errorResponse(
        res,
        `Invalid status. Must be one of: ${Object.values(CampaignStatus).join(
          ", "
        )}`,
        400
      );
      return;
    }

    const campaign = await campaignService.createCampaign(campaignData);
    successResponse(res, campaign, "Campaign created successfully", 201);
  } catch (error) {
    errorResponse(res, "Failed to create campaign", 500, error);
  }
};

export const updateCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorResponse(res, "Invalid campaign ID", 400);
      return;
    }

    // Validate status if provided
    if (
      updateData.status &&
      !Object.values(CampaignStatus).includes(updateData.status)
    ) {
      errorResponse(
        res,
        `Invalid status. Must be one of: ${Object.values(CampaignStatus).join(
          ", "
        )}`,
        400
      );
      return;
    }

    // Prevent changing status to DELETED through update
    if (updateData.status === CampaignStatus.DELETED) {
      errorResponse(
        res,
        "Cannot set status to DELETED through update. Use delete endpoint instead.",
        400
      );
      return;
    }

    const updatedCampaign = await campaignService.updateCampaign(
      id,
      updateData
    );

    if (!updatedCampaign) {
      errorResponse(res, "Campaign not found", 404);
      return;
    }

    successResponse(res, updatedCampaign, "Campaign updated successfully");
  } catch (error) {
    errorResponse(res, "Failed to update campaign", 500, error);
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorResponse(res, "Invalid campaign ID", 400);
      return;
    }

    const deletedCampaign = await campaignService.deleteCampaign(id);

    if (!deletedCampaign) {
      errorResponse(res, "Campaign not found", 404);
      return;
    }

    successResponse(res, deletedCampaign, "Campaign deleted successfully");
  } catch (error) {
    errorResponse(res, "Failed to delete campaign", 500, error);
  }
};

export const generatePersonalizedMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profileData: ILinkedInProfile = req.body;

    // Validate the required fields
    const requiredFields = [
      "name",
      "job_title",
      "company",
      "location",
      "summary",
    ];
    const missingFields = requiredFields.filter(
      (field) => !profileData[field as keyof ILinkedInProfile]
    );

    if (missingFields.length > 0) {
      errorResponse(
        res,
        `Missing required fields: ${missingFields.join(", ")}`,
        400
      );
      return;
    }

    const personalizedMessage = await aiService.generatePersonalizedMessage(
      profileData
    );
    successResponse(
      res,
      personalizedMessage,
      "Personalized message generated successfully"
    );
  } catch (error) {
    console.log("Error in generatePersonalizedMessage controller:", error);
    errorResponse(res, "Failed to generate personalized message", 500, error);
  }
};

import { Router } from "express";
import * as campaignController from "../campaign/campaign.controller";

const router = Router();

// GET /api/campaigns - Get all campaigns
router.get("/", campaignController.getCampaigns);

// GET /api/campaigns/:id - Get a single campaign by ID
router.get("/:id", campaignController.getCampaignById);

// POST /api/campaigns - Create a new campaign
router.post("/", campaignController.createCampaign);

// PUT /api/campaigns/:id - Update a campaign
router.put("/:id", campaignController.updateCampaign);

// DELETE /api/campaigns/:id - Delete a campaign (soft delete)
router.delete("/:id", campaignController.deleteCampaign);

router.post("/gen-msg", campaignController.generatePersonalizedMessage);

export default router;

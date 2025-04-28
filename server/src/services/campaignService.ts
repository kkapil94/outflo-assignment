import Campaign, {
  ICampaignDocument,
} from "../modules/campaign/campaign.model";
import { CampaignStatus, ICampaign } from "../types";

class CampaignService {
  async getAllCampaigns(): Promise<ICampaignDocument[]> {
    try {
      return await Campaign.find({ status: { $ne: CampaignStatus.DELETED } });
    } catch (error) {
      console.log("Error fetching campaigns:", error);
      throw error;
    }
  }

  async getCampaignById(id: string): Promise<ICampaignDocument | null> {
    try {
      const campaign = await Campaign.findOne({
        _id: id,
        status: { $ne: CampaignStatus.DELETED },
      });
      return campaign;
    } catch (error) {
      console.log(`Error fetching campaign with id ${id}:`, error);
      throw error;
    }
  }

  async createCampaign(campaignData: ICampaign): Promise<ICampaignDocument> {
    try {
      const campaign = new Campaign(campaignData);
      return await campaign.save();
    } catch (error) {
      console.log("Error creating campaign:", error);
      throw error;
    }
  }

  async updateCampaign(
    id: string,
    campaignData: Partial<ICampaign>
  ): Promise<ICampaignDocument | null> {
    try {
      return await Campaign.findByIdAndUpdate(id, campaignData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.log(`Error updating campaign with id ${id}:`, error);
      throw error;
    }
  }

  async deleteCampaign(id: string): Promise<ICampaignDocument | null> {
    try {
      // Soft delete - update status to DELETED
      return await Campaign.findByIdAndUpdate(
        id,
        { status: CampaignStatus.DELETED },
        { new: true }
      );
    } catch (error) {
      console.log(`Error deleting campaign with id ${id}:`, error);
      throw error;
    }
  }
}

export const campaignService = new CampaignService();

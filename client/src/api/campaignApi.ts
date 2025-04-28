import axios from "axios";
import {
  ApiResponse,
  Campaign,
  CreateCampaignDto,
  UpdateCampaignDto,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const campaignApi = {
  // Get all campaigns
  getAllCampaigns: async (): Promise<Campaign[]> => {
    try {
      const response = await axios.get<ApiResponse<Campaign[]>>(
        `${API_URL}/campaigns`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    }
  },

  // Get campaign by id
  getCampaignById: async (id: string): Promise<Campaign> => {
    try {
      const response = await axios.get<ApiResponse<Campaign>>(
        `${API_URL}/campaigns/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching campaign with id ${id}:`, error);
      throw error;
    }
  },

  // Create new campaign
  createCampaign: async (
    campaignData: CreateCampaignDto
  ): Promise<Campaign> => {
    try {
      const response = await axios.post<ApiResponse<Campaign>>(
        `${API_URL}/campaigns`,
        campaignData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  },

  // Update campaign
  updateCampaign: async (
    id: string,
    campaignData: UpdateCampaignDto
  ): Promise<Campaign> => {
    try {
      const response = await axios.put<ApiResponse<Campaign>>(
        `${API_URL}/campaigns/${id}`,
        campaignData
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating campaign with id ${id}:`, error);
      throw error;
    }
  },

  // Delete campaign
  deleteCampaign: async (id: string): Promise<Campaign> => {
    try {
      const response = await axios.delete<ApiResponse<Campaign>>(
        `${API_URL}/campaigns/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting campaign with id ${id}:`, error);
      throw error;
    }
  },
};

export default campaignApi;

import axios from "axios";
import { ApiResponse, LinkedInProfile, PersonalizedMessage } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const messageApi = {
  // Generate personalized message
  generatePersonalizedMessage: async (
    profileData: LinkedInProfile
  ): Promise<PersonalizedMessage> => {
    try {
      const response = await axios.post<ApiResponse<PersonalizedMessage>>(
        `${API_URL}/campaigns/gen-msg`,
        profileData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error generating personalized message:", error);
      throw error;
    }
  },
};

export default messageApi;

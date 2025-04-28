export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[];
  accountIDs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignDto {
  name: string;
  description: string;
  status?: CampaignStatus;
  leads?: string[];
  accountIDs?: string[];
}

export interface UpdateCampaignDto {
  name?: string;
  description?: string;
  status?: CampaignStatus;
  leads?: string[];
  accountIDs?: string[];
}

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface PersonalizedMessage {
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
  error?: string;
}

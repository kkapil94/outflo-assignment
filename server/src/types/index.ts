export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface ICampaign {
  name: string;
  description: string;
  status: CampaignStatus;
  leads: string[]; // Array of LinkedIn URLs
  accountIDs: string[]; // Array of account IDs
}

export interface ILinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

export interface IPersonalizedMessage {
  message: string;
}

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Campaign,
  CampaignStatus,
  CreateCampaignDto,
  UpdateCampaignDto,
} from "../types";
import campaignApi from "../api/campaignApi";
import { toast } from "react-toastify";

interface CampaignContextType {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchCampaigns: () => Promise<void>;
  getCampaign: (id: string) => Promise<Campaign | undefined>;
  createCampaign: (
    campaignData: CreateCampaignDto
  ) => Promise<Campaign | undefined>;
  updateCampaign: (
    id: string,
    campaignData: UpdateCampaignDto
  ) => Promise<Campaign | undefined>;
  deleteCampaign: (id: string) => Promise<boolean>;
  toggleCampaignStatus: (
    id: string,
    currentStatus: CampaignStatus
  ) => Promise<Campaign | undefined>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await campaignApi.getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch campaigns";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getCampaign = async (id: string): Promise<Campaign | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const campaign = await campaignApi.getCampaignById(id);
      return campaign;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : `Failed to fetch campaign ${id}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (
    campaignData: CreateCampaignDto
  ): Promise<Campaign | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const newCampaign = await campaignApi.createCampaign(campaignData);
      setCampaigns((prev) => [...prev, newCampaign]);
      toast.success("Campaign created successfully");
      return newCampaign;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create campaign";
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = async (
    id: string,
    campaignData: UpdateCampaignDto
  ): Promise<Campaign | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const updatedCampaign = await campaignApi.updateCampaign(
        id,
        campaignData
      );
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign._id === id ? updatedCampaign : campaign
        )
      );
      toast.success("Campaign updated successfully");
      return updatedCampaign;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : `Failed to update campaign ${id}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await campaignApi.deleteCampaign(id);
      // After soft delete, we refresh the campaigns list
      await fetchCampaigns();
      toast.success("Campaign deleted successfully");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : `Failed to delete campaign ${id}`;
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleCampaignStatus = async (
    id: string,
    currentStatus: CampaignStatus
  ): Promise<Campaign | undefined> => {
    const newStatus =
      currentStatus === CampaignStatus.ACTIVE
        ? CampaignStatus.INACTIVE
        : CampaignStatus.ACTIVE;
    return await updateCampaign(id, { status: newStatus });
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        loading,
        error,
        fetchCampaigns,
        getCampaign,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        toggleCampaignStatus,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignContext must be used within a CampaignProvider"
    );
  }
  return context;
};

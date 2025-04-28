import React from "react";
import { Campaign, CampaignStatus } from "../../types";
import CampaignCard from "./CampaignCard";
import Loader from "../common/Loader";

interface CampaignListProps {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  onToggleStatus: (id: string, status: CampaignStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  loading,
  error,
  onToggleStatus,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader text="Loading campaigns..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold text-gray-600">
          No campaigns found
        </h3>
        <p className="text-gray-500">Create a new campaign to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign._id}
          campaign={campaign}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CampaignList;

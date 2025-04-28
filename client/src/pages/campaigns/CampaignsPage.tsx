import React from "react";
import { Link } from "react-router-dom";
import { useCampaignContext } from "../../context/CampaignContext";
import CampaignList from "../../components/campaigns/CampaignList";
import Button from "../../components/common/Button";
import { CampaignStatus } from "../../types";

const CampaignsPage: React.FC = () => {
  const { campaigns, loading, error, toggleCampaignStatus, deleteCampaign } =
    useCampaignContext();

  const handleToggleStatus = async (id: string, status: CampaignStatus) => {
    await toggleCampaignStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    await deleteCampaign(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <Link to="/campaigns/new">
          <Button variant="primary">Create Campaign</Button>
        </Link>
      </div>

      <CampaignList
        campaigns={campaigns}
        loading={loading}
        error={error}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CampaignsPage;

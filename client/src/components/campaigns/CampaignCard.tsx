import React from "react";
import { Link } from "react-router-dom";
import { Campaign, CampaignStatus } from "../../types";
import Button from "../common/Button";

interface CampaignCardProps {
  campaign: Campaign;
  onToggleStatus: (id: string, status: CampaignStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onToggleStatus,
  onDelete,
}) => {
  const handleStatusToggle = async () => {
    await onToggleStatus(campaign._id, campaign.status);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await onDelete(campaign._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{campaign.name}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              campaign.status === CampaignStatus.ACTIVE
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {campaign.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{campaign.description}</p>
        <div className="mb-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Leads:</span> {campaign.leads.length}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Accounts:</span>{" "}
            {campaign.accountIDs.length}
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/campaigns/${campaign._id}`} className="flex-1">
            <Button variant="outline" fullWidth>
              View
            </Button>
          </Link>
          <Link to={`/campaigns/${campaign._id}/edit`} className="flex-1">
            <Button variant="secondary" fullWidth>
              Edit
            </Button>
          </Link>
        </div>
        <div className="flex space-x-2 mt-2">
          <Button
            variant={
              campaign.status === CampaignStatus.ACTIVE ? "primary" : "success"
            }
            fullWidth
            onClick={handleStatusToggle}
          >
            {campaign.status === CampaignStatus.ACTIVE
              ? "Deactivate"
              : "Activate"}
          </Button>
          <Button variant="danger" fullWidth onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;

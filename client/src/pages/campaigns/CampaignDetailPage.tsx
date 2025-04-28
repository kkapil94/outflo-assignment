import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCampaignContext } from "../../context/CampaignContext";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { Campaign, CampaignStatus } from "../../types";

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, toggleCampaignStatus, deleteCampaign } =
    useCampaignContext();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const campaignData = await getCampaign(id);
        if (campaignData) {
          setCampaign(campaignData);
        } else {
          setError("Campaign not found");
        }
      } catch (err) {
        setError("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, getCampaign]);

  const handleToggleStatus = async () => {
    if (!campaign) return;

    const updatedCampaign = await toggleCampaignStatus(
      campaign._id,
      campaign.status
    );
    if (updatedCampaign) {
      setCampaign(updatedCampaign);
    }
  };

  const handleDelete = async () => {
    if (!campaign) return;

    if (window.confirm("Are you sure you want to delete this campaign?")) {
      const deleted = await deleteCampaign(campaign._id);
      if (deleted) {
        navigate("/campaigns");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader text="Loading campaign..." />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="text-red-500 text-center">
        {error || "Campaign not found"}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
        <div className="flex space-x-2">
          <Link to={`/campaigns/${campaign._id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button
            variant={
              campaign.status === CampaignStatus.ACTIVE ? "primary" : "success"
            }
            onClick={handleToggleStatus}
          >
            {campaign.status === CampaignStatus.ACTIVE
              ? "Deactivate"
              : "Activate"}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{campaign.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <span
            className={`px-2 py-1 text-sm rounded-full ${
              campaign.status === CampaignStatus.ACTIVE
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {campaign.status}
          </span>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Created At</h2>
          <p className="text-gray-700">
            {new Date(campaign.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Leads ({campaign.leads.length})
          </h2>
          {campaign.leads.length === 0 ? (
            <p className="text-gray-500">No leads added yet</p>
          ) : (
            <ul className="list-disc pl-5">
              {campaign.leads.slice(0, 5).map((lead, index) => (
                <li key={index} className="text-gray-700 truncate">
                  <a
                    href={lead}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {lead}
                  </a>
                </li>
              ))}
              {campaign.leads.length > 5 && (
                <li className="text-gray-500">
                  ...and {campaign.leads.length - 5} more
                </li>
              )}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">
            Accounts ({campaign.accountIDs.length})
          </h2>
          {campaign.accountIDs.length === 0 ? (
            <p className="text-gray-500">No accounts added yet</p>
          ) : (
            <ul className="list-disc pl-5">
              {campaign.accountIDs.slice(0, 5).map((accountID, index) => (
                <li key={index} className="text-gray-700">
                  {accountID}
                </li>
              ))}
              {campaign.accountIDs.length > 5 && (
                <li className="text-gray-500">
                  ...and {campaign.accountIDs.length - 5} more
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Link to="/campaigns">
          <Button variant="outline">Back to Campaigns</Button>
        </Link>
      </div>
    </div>
  );
};

export default CampaignDetailPage;

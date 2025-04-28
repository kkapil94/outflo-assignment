import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCampaignContext } from "../../context/CampaignContext";
import CampaignForm from "../../components/campaigns/CampaignForm";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { Campaign, UpdateCampaignDto } from "../../types";

const EditCampaignPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, updateCampaign, loading } = useCampaignContext();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;

      setPageLoading(true);
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
        setPageLoading(false);
      }
    };

    fetchCampaign();
  }, [id, getCampaign]);

  const handleSubmit = async (data: UpdateCampaignDto) => {
    if (!id) return;

    const updatedCampaign = await updateCampaign(id, data);
    if (updatedCampaign) {
      navigate(`/campaigns/${id}`);
    }
  };

  if (pageLoading) {
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
        <Link to={`/campaigns/${id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <CampaignForm
        initialData={campaign}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditCampaignPage;

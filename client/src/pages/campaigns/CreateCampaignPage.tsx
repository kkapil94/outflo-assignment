import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCampaignContext } from "../../context/CampaignContext";
import CampaignForm from "../../components/campaigns/CampaignForm";
import Button from "../../components/common/Button";
import { CreateCampaignDto } from "../../types";

const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const { createCampaign, loading } = useCampaignContext();

  const handleSubmit = async (data: CreateCampaignDto) => {
    const newCampaign = await createCampaign(data);
    if (newCampaign) {
      navigate(`/campaigns/${newCampaign._id}`);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
        <Link to="/campaigns">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <CampaignForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateCampaignPage;

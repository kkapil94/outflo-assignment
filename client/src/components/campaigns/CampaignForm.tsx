import React, { useState, useEffect } from "react";
import { Campaign, CampaignStatus, CreateCampaignDto } from "../../types";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

interface CampaignFormProps {
  initialData?: Campaign;
  onSubmit: (data: CreateCampaignDto) => Promise<void>;
  loading: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  initialData,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<CreateCampaignDto>({
    name: "",
    description: "",
    status: CampaignStatus.ACTIVE,
    leads: [],
    accountIDs: [],
  });

  const [leadsInput, setLeadsInput] = useState<string>("");
  const [accountsInput, setAccountsInput] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        status: initialData.status,
        leads: initialData.leads,
        accountIDs: initialData.accountIDs,
      });
      setLeadsInput(initialData.leads.join("\n"));
      setAccountsInput(initialData.accountIDs.join("\n"));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as CampaignStatus,
    }));
  };

  const handleLeadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeadsInput(e.target.value);
    const leads = e.target.value
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");
    setFormData((prev) => ({ ...prev, leads }));
  };

  const handleAccountsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccountsInput(e.target.value);
    const accountIDs = e.target.value
      .split("\n")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    setFormData((prev) => ({ ...prev, accountIDs }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Campaign name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Campaign description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        label="Campaign Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter campaign name"
        error={errors.name}
        required
      />

      <TextArea
        id="description"
        name="description"
        label="Campaign Description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter campaign description"
        error={errors.description}
        required
      />

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={CampaignStatus.ACTIVE}>Active</option>
          <option value={CampaignStatus.INACTIVE}>Inactive</option>
        </select>
      </div>

      <TextArea
        id="leads"
        name="leads"
        label="LinkedIn Profile URLs (one per line)"
        value={leadsInput}
        onChange={handleLeadsChange}
        placeholder="https://linkedin.com/in/profile-1
https://linkedin.com/in/profile-2"
        rows={5}
      />

      <TextArea
        id="accounts"
        name="accounts"
        label="Account IDs (one per line)"
        value={accountsInput}
        onChange={handleAccountsChange}
        placeholder="123
456"
        rows={3}
      />

      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading
            ? "Saving..."
            : initialData
            ? "Update Campaign"
            : "Create Campaign"}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;

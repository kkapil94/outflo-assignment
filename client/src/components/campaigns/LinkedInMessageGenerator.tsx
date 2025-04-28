import React, { useState } from "react";
import { LinkedInProfile } from "../../types";
import { useLinkedInMessage } from "../../hooks/useLinkedinMessage";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import Loader from "../common/Loader";

const LinkedInMessageGenerator: React.FC = () => {
  const [profileData, setProfileData] = useState<LinkedInProfile>({
    name: "John Doe",
    job_title: "Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    summary:
      "Experienced in AI & ML with 5+ years in developing scalable applications.",
  });

  const { message, loading, error, generateMessage, clearMessage } =
    useLinkedInMessage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateMessage(profileData);
  };

  const handleClear = () => {
    clearMessage();
  };

  const handleCopyMessage = () => {
    if (message) {
      navigator.clipboard.writeText(message.message);
      alert("Message copied to clipboard!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        LinkedIn Message Generator
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <Input
          id="name"
          name="name"
          label="Full Name"
          value={profileData.name}
          onChange={handleChange}
          placeholder="Enter the person's full name"
          className="mb-4"
        />

        <Input
          id="job_title"
          name="job_title"
          label="Job Title"
          value={profileData.job_title}
          onChange={handleChange}
          placeholder="Enter their job title"
          className="mb-4"
        />

        <Input
          id="company"
          name="company"
          label="Company"
          value={profileData.company}
          onChange={handleChange}
          placeholder="Enter their company name"
          className="mb-4"
        />

        <Input
          id="location"
          name="location"
          label="Location"
          value={profileData.location}
          onChange={handleChange}
          placeholder="Enter their location"
          className="mb-4"
        />

        <TextArea
          id="summary"
          name="summary"
          label="Profile Summary"
          value={profileData.summary}
          onChange={handleChange}
          placeholder="Enter their profile summary or relevant experience"
          className="mb-6"
          rows={4}
        />

        <div className="flex justify-between">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? <Loader size="sm" /> : "Generate Message"}
          </Button>

          <Button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Clear
          </Button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {message && !loading && !error && (
        <div className="mt-6 border rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Generated Message:</h3>
          <div className="bg-gray-50 p-4 rounded-md mb-4 whitespace-pre-wrap">
            {message.message}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleCopyMessage}
              className="bg-green-600 hover:bg-green-700"
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInMessageGenerator;

import { useState } from "react";
import { LinkedInProfile, PersonalizedMessage } from "../types";
import messageApi from "../api/messageApi";
import { toast } from "react-toastify";

interface UseLinkedInMessageReturn {
  message: PersonalizedMessage | null;
  loading: boolean;
  error: string | null;
  generateMessage: (profileData: LinkedInProfile) => Promise<void>;
  clearMessage: () => void;
}

export const useLinkedInMessage = (): UseLinkedInMessageReturn => {
  const [message, setMessage] = useState<PersonalizedMessage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateMessage = async (
    profileData: LinkedInProfile
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const generatedMessage = await messageApi.generatePersonalizedMessage(
        profileData
      );
      setMessage(generatedMessage);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate message";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = (): void => {
    setMessage(null);
    setError(null);
  };

  return {
    message,
    loading,
    error,
    generateMessage,
    clearMessage,
  };
};

import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  code: string;
}

const createGoogleAccessToken = async (data: RequestData) => {
  const result = await axiosMainServer.post<string | null | undefined>(
    "/google/access-token",
    {
      code: data.code,
    }
  );

  return result.data;
};

export const useCreateGoogleAccessToken = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createGoogleAccessToken,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Google",
        description: "Sucessfully integrated with Google",
      });
      navigate({
        to: "/integrations",
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Google",
        description: "Failed to integrate with Google",
      });
      navigate({
        to: "/integrations",
      });
    },
  });

  return {
    createGoogleAccessToken: mutate,
    isPending,
  };
};

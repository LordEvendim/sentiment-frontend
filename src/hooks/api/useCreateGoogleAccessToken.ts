import { useMutation } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  code: string;
}

const createGoogleAccessToken = async (data: RequestData) => {
  const result = await axiosMainServer.post<Report>("/google/access-token", {
    code: data.code,
  });

  return result.data;
};

export const useCreateGoogleAccessToken = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createGoogleAccessToken,
    onSuccess: () => {},
  });

  return {
    createGoogleAccessToken: mutate,
    isPending,
  };
};

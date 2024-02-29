import { useMutation } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  code: string;
}

const setGoogleAccessToken = async (data: RequestData) => {
  const result = await axiosMainServer.post<Report>("/google/access-token", {
    code: data.code,
  });

  return result.data;
};

export const useSetGoogleAccessToken = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: setGoogleAccessToken,
    onSuccess: () => {},
  });

  return {
    setGoogleAccessToken: mutate,
    isPending,
  };
};

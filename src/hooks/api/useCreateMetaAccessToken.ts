import { useMutation } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";

interface RequestData {
  metaId: string;
  accessToken: string;
}

const createToken = async ({ metaId, accessToken }: RequestData) => {
  const result = await axiosMainServer.post<string>("/meta/access-token", {
    metaId,
    accessToken,
  });

  return result.data;
};

export const useCreateMetaAccessToken = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createToken,
    onSuccess: () => {},
  });

  return {
    createMetaAccessToken: mutate,
    isPending,
  };
};

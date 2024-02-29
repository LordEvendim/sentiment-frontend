import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const fetchLlat = async (
  userId: string,
  metaId: string,
  accessToken: string
) => {
  const result = await axiosMainServer.get<string>("/auth/meta/llat", {
    params: {
      userId,
      metaId,
      accessToken,
    },
  });

  return result.data;
};

export const useGetLongLivedToken = (
  userId: number | undefined,
  metaId: string | undefined,
  accessToken: string | undefined
) => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: Boolean(userId) && Boolean(accessToken) && Boolean(metaId),
    queryKey: [QueryKey.Llat, userId],
    queryFn: () => fetchLlat(userId!.toString(), metaId!, accessToken!),
  });

  return {
    token: data,
    isFetching,
  };
};

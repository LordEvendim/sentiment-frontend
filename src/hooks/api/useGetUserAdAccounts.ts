import { useQuery } from "@tanstack/react-query";

import { axiosMainServer } from "#config/axios";
import { QueryKey } from "#config/query";

const fetchUserAdAccounts = async (userId: string) => {
  const result = await axiosMainServer.get<{ name: string; id: string }[]>(
    "/meta/ad-accounts",
    {
      params: {
        userId,
      },
    }
  );

  return result.data;
};

export const useGetUserAdAccounts = (
  userId: string | undefined,
  isEnabled: boolean
) => {
  const { data, isFetching } = useQuery({
    staleTime: 0,
    enabled: isEnabled && Boolean(userId),
    queryKey: [QueryKey.AdAccounts, userId],
    queryFn: () => fetchUserAdAccounts(userId!),
  });

  return {
    adAccounts: data,
    isFetching,
  };
};
